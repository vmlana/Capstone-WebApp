require("dotenv").config();
let express = require("express");
let app = express();

const promise_mysql = require("promise-mysql");
const {pivotPoolDb} = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

app.set("accessSecretKey", process.env.AccessTokenSecret);
app.set("refreshSecretKey", process.env.RefreshTokenSecret);

// const refreshTokensList = [];

// Signup **************************************

exports.register = (req, res) => {
    const { email, password, userType } = req.body;
    let hashed_password = bcrypt.hashSync(password, 10);

    // userType should be user, instructor or company

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
                    res.send({ 
                        message: "This email address is already used.",
                        success: false
                    });
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
                    let loginId = results.insertId;

                    if (userType === "user") {
                        table = "users";
                        idAttribute = "userId"
                    } else if (userType === "instructor") {
                        table = "instructors";
                        idAttribute = "instructorId"
                    } else if (userType === "company") {
                        table = "companies";
                        idAttribute = "companyId"
                    }

                    pool.query(
                        `
                        INSERT INTO ${table} (${idAttribute}) VALUES 
                        ( ${loginId});
                        `
                    ).then((results)=>{
                        console.log(results);
                        const payload = {
                            authId: loginId,
                            userType: userType,
                            // email: email,
                        };
                        const accessToken = jwt.sign(
                            payload,
                            app.get("accessSecretKey"),
                            {
                                expiresIn: parseInt(process.env.AccessTokenLife),
                            }
                        );
                        const refreshToken = jwt.sign(
                            payload,
                            app.get("refreshSecretKey"),
                            {
                                expiresIn: parseInt(process.env.RefreshTokenLife),
                            }
                        );

                        // refreshTokensList.push(refreshToken);
                        res.status(200).send({
                            success: true,
                            authId: loginId,
                            userType: userType,
                            accessToken,
                            refreshToken,
                            accessExpiresIn:
                            new Date().getTime() +
                            parseInt(process.env.AccessTokenLife) * 1000,
                            refreshExpiresIn:
                            new Date().getTime() +
                            parseInt(process.env.RefreshTokenLife) * 1000,

                            // accessExpiresIn: parseInt(process.env.AccessTokenLife),
                            // refreshExpiresIn: parseInt(process.env.RefreshTokenLife),
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
    const { email, password, userType } = req.body;

    // console.log(email, password, userType);

    let table;
    let idAttribute;

    if (userType === "user") {
        table = "users";
        idAttribute = "userId"
    } else if (userType === "instructor") {
        table = "instructors";
        idAttribute = "instructorId"
    } else if (userType === "company") {
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
                    // console.log(results[0]);
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
                            authId: results[0].loginId,
                            userType: userType,
                        };
                        // console.log(payload);
                        const accessToken = jwt.sign(
                            payload,
                            app.get("accessSecretKey"),
                            { expiresIn: parseInt(process.env.AccessTokenLife) }
                        );
                        const refreshToken = jwt.sign(
                            payload,
                            app.get("refreshSecretKey"),
                            { expiresIn: process.env.RefreshTokenLife }
                        );

                        // refreshTokensList.push(refreshToken);

                        res.status(200).json({
                            success: true,
                            authId: results[0].loginId,
                            userType: userType,
                            accessToken,
                            refreshToken,
                            accessExpiresIn:
                                new Date().getTime() +
                                parseInt(process.env.AccessTokenLife) * 1000,
                            refreshExpiresIn:
                                new Date().getTime() +
                                parseInt(process.env.RefreshTokenLife) * 1000,
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
    // const { refreshToken } = req.body || req.query || req.headers["refresh-token"];
    const refreshToken = req.headers["refresh-token"] || req.body.refreshToken;

    // console.log(refreshToken);

    jwt.verify(refreshToken, app.get("refreshSecretKey"), (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        // console.log(user)
        const refreshedUser = {
            authId: user.authId,
            userType: user.userType,
        };
        const accessToken = jwt.sign(
            refreshedUser,
            app.get("accessSecretKey"),
            {
                expiresIn: parseInt(process.env.AccessTokenLife),
            }
        );
        const refreshToken = jwt.sign(
            refreshedUser,
            app.get("refreshSecretKey"),
            { expiresIn: process.env.RefreshTokenLife }
        );
        const response = {
            success: "true",
            authId: user.authId,
            userType: user.userType,
            accessToken,
            refreshToken,
            accessExpiresIn:
                new Date().getTime() + parseInt(process.env.AccessTokenLife) * 1000,
            refreshExpiresIn:
                new Date().getTime() + parseInt(process.env.RefreshTokenLife) * 1000,
        };

        res.status(200).json(response);
    });
};

// Verify Token Test **********************************

exports.verify = (req, res) => {
    const tokenContents = req.decoded;
    // console.log(req.headers["access-token"]);
    // console.log(req.headers["refresh-token"]);
    // res.json(tokenContents);
    res.status(200).send({success: true});
};
