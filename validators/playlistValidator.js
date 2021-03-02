// ***************************************************
// Playlist Validations
// ***************************************************
const { pivotPoolDb } = require("../connection.js");
const { check } = require('express-validator'); 

const validateLevel = value => {
    if (
        value === "B" ||
        value === "I" ||
        value === "A" ||
        value === "Beginner" ||
        value === "Intermediate" ||
        value === "Advanced" 
    ) {
        return true;
    } else {
        return false;
    }
}




exports.playlistValidation = [

    // lesson name validation
    check("playlistName")
    .escape()
    .trim()
    .isLength({min:3, max:40}).withMessage("Playlist Name must be between 3 and 40 characters"),
    
    // description validation
    check("playlistDescription")
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

    // category validation
    check("active")
    .escape()
    .trim()
    .isInt().withMessage("active must be an integer value")
    .isFloat({min:0, max:1}).withMessage("active values: 0 - flase, 1 - true"),

    // levels validation
    check("playlistLevel")
    .escape()
    .trim()
    .custom(validateLevel).withMessage("Levels are: B - Beginner, I - Intermediate, A - Advanced")

];


