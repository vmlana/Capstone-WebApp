require("dotenv").config();
const jwt = require("jsonwebtoken");
// const config = require("../config");

exports.tokenValidator = (req, res, next) => {
    // Get token from header or　url parameters or post parameters
    const token =
        req.body.token || req.query.token || req.headers["access-token"];

    // console.log(token);

    if (token) {
        jwt.verify(token, process.env.AccessTokenSecret, (error, decoded) => {
            // console.log(error);
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired",
                });
            } else {
                // console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // No token error
        return res.status(403).send({
            success: false,
            message: "Token was not found.",
        });
    }
};