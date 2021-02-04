// *******************************************************
// ******** NPMs Installed *******************************
// *******************************************************
//
//      1)  npm init -y
//      2)  npm i express
//      3)  npm i mysql
//      4)  npm i promise-mysql
//      5)  npm i express-validator
//      6)  npm i nodemon --save-dev  
//      7)  npm i node-fetch
//      8)  npm i dotenv
//      9)  npm i cors
//
// *******************************************************
// ******** Required Modules *****************************
// *******************************************************

const express = require("express");
const app     = express();

// CORS ISSUE ********************************************
// Cors plugin implemented in app.js could not work well on AWS. 
// Therefore, header information, such as Access-Control-Allow-Origin’, have been set in server proxy setting file 
// the path of which is /etc/nginx/conf.d/default.conf on EC2 instance of AWS instead
//
// const cors = require('cors');
// app.use(cors())
// *******************************************************

const { savyDb } = require("./connection.js");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("listening port 3000");
});

// middleware parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const router = require('./routes/index.js');
app.use('/api', router);
