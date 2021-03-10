// ***************************************************
// Lesson Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 

// ----------------------------------------------------------
// Check if the ID Belongs to an instructor
// ----------------------------------------------------------
const isLesson = async value => {
    let qry = `SELECT lessonId from lessons i WHERE lessonId = ${value} `;
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


exports.lessonValidation = [

    // lesson id validation
    // check("lessonId")
    // .escape()
    // .trim()
    // .notEmpty().withMessage("Must have a valid lessonId")
    // .isInt().withMessage("LessonId must be an integer")
    // .custom(isLesson).withMessage("Id is not a valid lesson"),

    // lesson name validation
    check("lessonName")
    .escape()
    .trim()
    .isLength({min:3, max:40}).withMessage("Lesson Name must be between 3 and 40 characters"),
    
    // description validation
    check("description")
    .escape()
    .trim()
    .isLength({min:1, max:2000}).withMessage("Description must be between 1 and 2.000 characters"),    

    // description validation
    check("instructorId")
    .escape()
    .trim()
    .isInt().withMessage("InstructorId must be an integer value")
    .isFloat({min:1}).withMessage("instructorId must be greater than zero"),

    // category validation
    check("categoryId")
    .escape()
    .trim()
    .isInt().withMessage("categoryId must be an integer value")
    .isFloat({min:1}).withMessage("categoryId must be greater than zero"),

];


