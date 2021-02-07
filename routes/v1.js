const express = require("express");
const router  = express.Router();

const {getCategories} = require("../controllers/categoryController.js");

// Routes to capstone api - Version 1
router
    .get("/categories", getCategories)

module.exports = router;
