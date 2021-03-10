// ***************************************************
// Company Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 

// ---------------------------------------------------
// Check if the ID Belongs to an company
// ---------------------------------------------------
const isCompany = async value => {
    let qry = `SELECT companyId from companies WHERE companyId = ${value} `;
    await pivotPoolDb.then(pool => {
        pool.query(qry)
            .then(results => {
                // console.log('vini');
                // console.log(results.length);
                if (results.length == 0) {
                    return false;
                } else {
                    return true;
                }
            })
    })
        .catch(error => {
            console.log(error);
        });
}


exports.companyValidation = [

    // company id validation
    check("companyId")
        .escape()
        .trim()
        .notEmpty().withMessage("Must have a valid companyId")
        .isInt().withMessage("CompanyId must be an integer")
        .custom(isCompany).withMessage("Id is not a valid company"),

    // company name validation
    check("companyName")
        .escape()
        .trim()
        .isLength({ min: 3, max: 40 }).withMessage("Company Name must be between 3 and 40 characters"),

    // contact email validation
    check("contactEmail")
        .escape()
        .trim()
        .isEmail().withMessage("Not a valid email"),

    // phone number validation
    check("phoneNumber")
        .escape()
        .trim()
        .isNumeric().withMessage("Phone number must be numeric values"),

    // address validation
    check("address")
        .escape()
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage("Address must be between 1 and 200 characters")

];
