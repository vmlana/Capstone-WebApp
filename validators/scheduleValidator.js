// ***************************************************
// Schedule Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 


exports.scheduleValidation = [

    // user id validation
    check("userId")
    .escape()
    .trim()
    .notEmpty().withMessage("Must have a valid userId")
    .isInt().withMessage("UserId must be an integer"),

    // schedule date
    check("scheduleDate")
    .escape()
    .trim()
    .notEmpty().withMessage('Must inform a date in format yyyy-mm-dd hh:mm:ss'),
   // .isISO8601('yyyy-mm-dd')
   // .matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2//// [0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/')
   // .withMessage("Not a Valid Date. Date format yyyy:mm:dd hh:mm:ss"),

    // reminder in minutes
    check("reminderMinutes")
    .escape()
    .trim()
    .isInt().withMessage("Must be an integer value")

];


