const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getDepartments} = require("../controllers/departmentController.js");
const {getTags} = require("../controllers/tagController.js");
const {getCities} = require("../controllers/cityController.js");
const {getSearch} = require("../controllers/searchController.js");
const {getCompany, getCompanies, updCompany} = require("../controllers/companyController.js");
const {getInstructor, updInstructor } = require("../controllers/instructorController.js");
const {getUser, updUser} = require("../controllers/userController.js");
const {getLessons, updLesson} = require("../controllers/lessonController.js");
const {getPlaylists, updPlaylist} = require("../controllers/playlistController.js");
const {getPrograms} = require("../controllers/programController.js");
const {getBlogs} = require("../controllers/blogController.js");
const {postS3Storage, deleteS3Storage} = require("../controllers/s3StorageController");

// Import validator
const {s3FileTypeValidator} = require("../validators/s3Validator");
const {companyValidation} = require("../validators/companyValidator");
const {instructorValidation} = require("../validators/instructorValidator");
const {userValidation} = require("../validators/userValidator");
const {lessonValidation} = require("../validators/lessonValidator");
const {playlistValidation} = require("../validators/playlistValidator");

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
    .get("/lessons", getLessons)    
    .get("/blogs", getBlogs)      
    .get("/search", getSearch)    
    .post("/updlesson", lessonValidation, updLesson)        
    .post("/updplaylist", playlistValidation, updPlaylist)            
    .post("/updinstructor", instructorValidation, updInstructor)    
    .post("/updcompany", companyValidation, updCompany)  
    .post("/upduser", userValidation, updUser)      
    .post("/s3storage", s3FileTypeValidator, postS3Storage)
    .delete("/s3storage", deleteS3Storage);

module.exports = router;
