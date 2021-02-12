const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getCompany} = require("../controllers/companyController.js");
const {getPlaylists} = require("../controllers/playlistController.js");
const {getPrograms} = require("../controllers/programController.js");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)
    .get("/company", getCompany)  
    .get("/programs", getPrograms)       
    .get("/playlists", getPlaylists);     

module.exports = router;
