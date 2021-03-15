const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getDepartments} = require("../controllers/departmentController.js");
const {getTags} = require("../controllers/tagController.js");
const {getCities} = require("../controllers/cityController.js");
const {getSearch} = require("../controllers/searchController.js");
const {getCompany, getCompanies, updCompany} = require("../controllers/companyController.js");
const {getInstructor, updInstructor } = require("../controllers/instructorController.js");
const {getUser, getDashboard, updUser} = require("../controllers/userController.js");
const {getLessons, updLesson} = require("../controllers/lessonController.js");
const {getPlaylists, updPlaylist} = require("../controllers/playlistController.js");
const {getPrograms} = require("../controllers/programController.js");
const {getBlogs} = require("../controllers/blogController.js");
const {getSurvey} = require("../controllers/surveyController.js");
const {getSchedule, addSchedule, delSchedule} = require("../controllers/scheduleController.js");
const {activityLog} = require("../controllers/activityLogController.js");
const {postS3Storage, deleteS3Storage} = require("../controllers/s3StorageController");
const { register, login, verify, refreshToken } = require("../controllers/authController");

// Import validator
const {s3FileTypeValidator} = require("../validators/s3Validator");
const {companyValidation} = require("../validators/companyValidator");
const {instructorValidation} = require("../validators/instructorValidator");
const {userValidation} = require("../validators/userValidator");
const {lessonValidation} = require("../validators/lessonValidator");
const {playlistValidation} = require("../validators/playlistValidator");
const {scheduleValidation} = require("../validators/scheduleValidator");
const {tokenValidator} = require("../validators/tokenValidator");
const {activityLogValidation} = require("../validators/activityLogValidator");
const {userSignupValidator} = require("../validators/userSignupValidator");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)
    .get("/departments", getDepartments)
    .get("/tags", getTags)    
    .get("/cities", getCities)        
    .get("/companies", tokenValidator, getCompanies)     
    .get("/company", tokenValidator, getCompany)  
    .get("/instructor", getInstructor)      
    .get("/user", getUser)          
    .get("/dashboard", getDashboard)              
    .get("/programs", getPrograms)       
    .get("/playlists", getPlaylists)
    .get("/lessons", getLessons)    
    .get("/blogs", getBlogs)      
    .get("/schedules", getSchedule)    
    .get("/search", getSearch)      
    .get("/survey", getSurvey)          
    .post("/updlesson", lessonValidation, updLesson)        
    .post("/updplaylist", playlistValidation, updPlaylist)            
    .post("/updinstructor", instructorValidation, updInstructor)    
    .post("/updcompany", tokenValidator, companyValidation, updCompany)  
    .post("/upduser", userValidation, updUser)   
    .post("/activitylog", activityLogValidation, activityLog)     
    .post("/schedules", scheduleValidation, addSchedule)         
    .post("/s3storage", s3FileTypeValidator, postS3Storage)
    .post("/signup", userSignupValidator, register)
    .post("/login", login)
    .post("/verify", tokenValidator, verify)
    .post("/token", refreshToken)
    .delete("/s3storage", deleteS3Storage)
    .delete("/schedules", delSchedule);    


module.exports = router;
