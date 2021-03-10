// ***************************************************
// User Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 


// ----------------------------------------------------------
// Check if the ID Belongs to an user
// ----------------------------------------------------------
const isUser = async value => {
    let qry = `SELECT userId from users u WHERE userId = ${value} `;
    await pivotPoolDb.then(pool =>{
      pool.query(qry)
          .then(results => {
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


exports.userValidation = [

    // user id validation
    check("userId")
    .escape()
    .trim()
    .notEmpty().withMessage("Must have a valid userId")
    .isInt().withMessage("UserId must be an integer")
    .custom(isUser).withMessage("Id is not a valid user"),

    // user name validation
    check("userName")
    .escape()
    .trim()
    .isLength({min:3, max:40}).withMessage("User Name must be between 3 and 40 characters")

];

