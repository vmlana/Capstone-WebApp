require("dotenv").config();
const jwt = require("jsonwebtoken");
const { pivotPoolDb } = require("../connection.js");
const promise_mysql = require("promise-mysql");

exports.refreshTokenValidator = (req, res, next) => {
    // Get token from header or　url parameters or post parameters
    const refreshToken = req.headers["refresh-token"] || req.body.refreshToken || req.query.refreshToken;

    // console.log("token", token);
    if (refreshToken) {

        pivotPoolDb.then(async(pool)=>{

            const isBlackList = await pool.query(`
                select
                    *
                from
                    tokenBlacklist tb
                where
                tb.token = ${promise_mysql.escape(refreshToken)}
            `).then((result)=>{
                return result;
            })

            if (isBlackList.length > 0) {
                res.status(400).send({
                    message: "This refreshToken is  lready registered to the blacklist.",
                    success: false
                });
            } else {
                next();
            }
        })
    } else {
        // No token error
        return res.status(403).send({
            success: false,
            message: "Token was not found.",
        });
    }
};