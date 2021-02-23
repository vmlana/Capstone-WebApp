const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getDepartments} = require("../controllers/departmentController.js");
const {getTags} = require("../controllers/tagController.js");
const {getCities} = require("../controllers/cityController.js");
const {getCompany, getCompanies, updCompany, companyValidation} = require("../controllers/companyController.js");
const {getInstructor, updInstructor, instructorValidation} = require("../controllers/instructorController.js");
const {getUser, updUser, userValidation} = require("../controllers/userController.js");
const {getPlaylists} = require("../controllers/playlistController.js");
const {getPrograms} = require("../controllers/programController.js");
const {postS3Storage, deleteS3Storage} = require("../controllers/s3StorageController");

// Import validator
const {s3FileTypeValidator} = require("../validators/s3Validator");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)
    .get("/departments", getDepartments)
    .get("/tags", getTags)    
    .get("/cities", getCities)        
    .get("/companies", getCompanies)     
    .get("/company", getCompany)  
    .get("/instructor", getInstructor)      
    .get("/user", getUser)          
    .get("/programs", getPrograms)       
    .get("/playlists", getPlaylists)
    .post("/updinstructor", instructorValidation, updInstructor)    
    .post("/updcompany", companyValidation, updCompany)  
    .post("/upduser", userValidation, updUser)      
    .post("/s3storage", s3FileTypeValidator, postS3Storage)
    .delete("/s3storage", deleteS3Storage);

module.exports = router;
