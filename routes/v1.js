const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");
const {getCompany} = require("../controllers/companyController.js");
const {getPlaylists} = require("../controllers/playlistController.js");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)
    .get("/company", getCompany)  
    .get("/playlists", getPlaylists);     

module.exports = router;
