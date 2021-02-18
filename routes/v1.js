const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getCompany, getCompanies} = require("../controllers/companyController.js");
const {getInstructor} = require("../controllers/instructorController.js");
const {getUser} = require("../controllers/userController.js");
const {getPlaylists} = require("../controllers/playlistController.js");
const {getPrograms} = require("../controllers/programController.js");
const {postS3Storage, deleteS3Storage} = require("../controllers/s3StorageController");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)
    .get("/companies", getCompanies)     
    .get("/company", getCompany)  
    .get("/instructor", getInstructor)      
    .get("/user", getUser)          
    .get("/programs", getPrograms)       
    .get("/playlists", getPlaylists)
    .post("/s3storage", postS3Storage)
    .delete("/s3storage", deleteS3Storage);

module.exports = router;
