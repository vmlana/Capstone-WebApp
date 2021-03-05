const jwt = require("jsonwebtoken");
const config = require("../config");

exports.tokenValidator = (req, res, next) => {
    // Get token from header or　url parameters or post parameters
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    // console.log(token);

    if (token) {
        jwt.verify(token, config.accessTokenSecret, (error, decoded) => {
            // console.log(error);
            if (error) {
                return res.json({
                    success: false,
                    message: "Token has not been verified.",
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