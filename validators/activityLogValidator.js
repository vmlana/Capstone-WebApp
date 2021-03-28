// ***************************************************
// ActivityLog Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 


exports.activityLogValidation = [

    // user id validation
    check("userId")
    .escape()
    .trim()
    .notEmpty().withMessage("Must have a valid userId")
    .isInt().withMessage("UserId must be an integer")

];


