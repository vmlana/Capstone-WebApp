// ***************************************************
// Instructor Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 

// ----------------------------------------------------------
// Check if the ID Belongs to an instructor
// ----------------------------------------------------------
const isInstructor = async value => {
    let qry = `SELECT instructorId from instructors i WHERE instructorId = ${value} `;
    await pivotPoolDb.then(pool =>{
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


exports.instructorValidation = [

    // instructor id validation
    check("instructorId")
    .escape()
    .trim()
    .notEmpty().withMessage("Must have a valid instructorId")
    .isInt().withMessage("InstructorId must be an integer")
    .custom(isInstructor).withMessage("Id is not a valid instructor"),

    // instructor name validation
    check("instructorName")
    .escape()
    .trim()
    .isLength({min:3, max:40}).withMessage("Instructor Name must be between 3 and 40 characters"),
    
    // specializarion area validation
    check("specializationArea")
    .escape()
    .trim()
    .isLength({min:1, max:100}).withMessage("Specialization Area must be between 1 and 100 characters"),    

    // phone number validation
    check("phoneNumber")
    .escape()
    .trim()
    .isNumeric().withMessage("Phone number must be numeric values"),    
    
    // address validation
    check("address")
    .escape()
    .trim()
    .isLength({min:1, max:200}).withMessage("Address must be between 1 and 200 characters") 

];


