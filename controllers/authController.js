let express = require("express");
let app = express();

const promise_mysql = require("promise-mysql");
const {pivotPoolDb} = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

app.set("accessSecretKey", config.accessTokenSecret);
app.set("refreshSecretKey", config.refreshTokenSecret);

// const refreshTokensList = [];

// Signup **************************************

exports.register = (req, res) => {
    const { email, password, type } = req.body;
    let hashed_password = bcrypt.hashSync(password, 10);

    // type should be user, instructor or company

    try {
        pivotPoolDb
            .then(async (pool) => {
                // Check the existing records ===================
                const isUserExist = await pool
                .query(
                    `
                    select * from login where userLogin = ${promise_mysql.escape(email)};
                    `
                )
                .then((results) => {
                    return results;
                })
                .catch((error)=>{
                    throw error;
                })

                // console.log(isUserExist);

                if (isUserExist.length > 0) {
                    res.send({ message: "This email address is already used." });
                    return;
                }

                // Insert a new record into login table ===================
                pool.query(
                    `
                    INSERT INTO login (userLogin, password) VALUES 
                    ( ${promise_mysql.escape(email)}, '${hashed_password}');
                    `
                    )
                .then((results) => {
                    // Insert a new record into users, companies or instructors table ===================
                    let table;
                    let idAttribute;

                    if (type === "user") {
                        table = "users";
                        idAttribute = "userId"
                    } else if (type === "instructor") {
                        table = "instructors";
                        idAttribute = "instructorId"
                    } else if (type === "company") {
                        table = "companies";
                        idAttribute = "companyId"
                    }

                    pool.query(
                        `
                        INSERT INTO ${table} (${idAttribute}) VALUES 
                        ( ${results.insertId});
                        `
                    ).then((results)=>{
                        const payload = {
                            id: results.insertId,
                            type: type,
                            // email: email,
                        };
                        const accessToken = jwt.sign(
                            payload,
                            app.get("accessSecretKey"),
                            {
                                expiresIn: config.accessTokenLife,
                            }
                        );
                        const refreshToken = jwt.sign(
                            payload,
                            app.get("refreshSecretKey"),
                            {
                                expiresIn: config.refreshTokenLife,
                            }
                        );

                        // refreshTokensList.push(refreshToken);
                        res.status(200).send({
                            success: true,
                            id: results.insertId,
                            type: type,
                            accessToken,
                            refreshToken,
                            accessExpiresIn: parseInt(config.accessTokenLife),
                            refreshExpiresIn: parseInt(config.refreshTokenLife),
                        });
                    })
                    .catch((error)=>{
                        throw error;
                    });
                })
                .catch((error)=>{
                    throw error;
                });
            })
            .catch((error)=>{
                throw error;
            });
    } catch(error) {
        res.sendStatus(409);
    }

};

// Login **************************************

exports.login = (req, res) => {
    const { email, password, type } = req.body;

    let table;
    let idAttribute;

    if (type === "user") {
        table = "users";
        idAttribute = "userId"
    } else if (type === "instructor") {
        table = "instructors";
        idAttribute = "instructorId"
    } else if (type === "company") {
        table = "companies";
        idAttribute = "companyId"
    }

    try {
        pivotPoolDb
            .then((pool) => {
                pool.query(
                    `
                    select
                        l.loginId,
                        l.userLogin,
                        l.password
                    from
                        ${table}
                    inner join 
                        login l 
                    on ${table}.${idAttribute} = l.loginId
                    where l.userLogin = ${promise_mysql.escape(email)};
                `
                )
                // pool.query(
                //     `
                //     select * from login where userLogin = ${promise_mysql.escape(email)};
                // `
                // )
                .then((results) => {

                    if(results.length === 0) {
                        res.sendStatus(401);
                    }

                    if (!bcrypt.compareSync(password, results[0].password)) {
                        res.send({
                            success: false,
                            message: "Your email or password is wrong.",
                        });
                    } else {
                        // Issue token
                        const payload = {
                            id: results[0].id,
                            type: type,
                        };
                        // console.log(payload);
                        const accessToken = jwt.sign(
                            payload,
                            app.get("accessSecretKey"),
                            { expiresIn: config.accessTokenLife }
                        );
                        const refreshToken = jwt.sign(
                            payload,
                            app.get("refreshSecretKey"),
                            { expiresIn: config.refreshTokenLife }
                        );

                        // refreshTokensList.push(refreshToken);

                        res.status(200).json({
                            success: true,
                            id: results[0].id,
                            type: type,
                            accessToken,
                            refreshToken,
                            accessExpiresIn:
                                new Date().getTime() +
                                parseInt(config.accessTokenLife) * 1000,
                            refreshExpiresIn:
                                new Date().getTime() +
                                parseInt(config.refreshTokenLife) * 1000,
                        });
                    }
                    // res.send(results);
                })
                .catch((error) => {
                    throw error;
                });
            })
            .catch((error) => {
                throw error;
            });
    } catch(error) {
        res.sendStatus(401);
    }
};

// Refresh Token **********************************

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body || req.query || req.headers["x-access-token"];

    jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const refreshedUser = {
            id: user.id,
            type: user.type,
        };
        const accessToken = jwt.sign(
            refreshedUser,
            app.get("accessSecretKey"),
            {
                expiresIn: config.accessTokenLife,
            }
        );
        const refreshToken = jwt.sign(
            refreshedUser,
            app.get("refreshSecretKey"),
            { expiresIn: config.refreshTokenLife }
        );
        const response = {
            success: "true",
            type: user.type,
            accessToken,
            refreshToken,
            accessExpiresIn:
                new Date().getTime() + parseInt(config.accessTokenLife) * 1000,
            refreshExpiresIn:
                new Date().getTime() + parseInt(config.refreshTokenLife) * 1000,
        };

        res.status(200).json(response);
    });
};

// Verify Token Test **********************************

exports.verify = (req, res) => {
    const tokenContents = req.decoded;
    // res.json(tokenContents);
    res.json({message: "success"});
};
