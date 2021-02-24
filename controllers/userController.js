const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult} = require("express-validator");


// ----------------------------------------------------------
// Returns the user profile data
// ----------------------------------------------------------
exports.getUser = (req, res) => {

    let userSearch = async (req) => {

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }

        let qry = `SELECT u.userId, l.userLogin, l.name as userName, l.imageFile as imageFile, u.employeeId,
                          c.companyId, lc.name as companyName
                     FROM users u
                          INNER JOIN login l ON (u.userId = l.loginId)
                          INNER JOIN employees e ON (u.companyId = e.companyId AND u.employeeId = e.employeeId)
                          INNER JOIN companies c ON (u.companyId = c.companyId)
                          INNER JOIN login lc ON (c.companyId = lc.loginId)
                    WHERE u.userId = ${sUserId} `;

        pivotPoolDb.then(pool => {
            pool.query(qry)
                .then(results => {
                    if (results.length == 0) {
                        res.status(404).send("No Record Found");
                    } else {
                        res.status(200).send(results);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(error);
                })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
    };

    userSearch(req);
};






// ----------------------------------------------------------
// Updates the user profile data
// ----------------------------------------------------------
exports.updUser = (req, res) => {

    let userUpdate = async (req) => {

        const valError = validationResult(req).array();
        //console.log(valError);

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else { 

            let sMessageInfo  = ''; 
            let objUser = req.body;
            console.log(objUser);
    
            let sUserId = pivotDb.escape(objUser.userId).replace(/['']+/g, '');
            if (sUserId == "" || sUserId.toLowerCase() == "null") {
                sUserId = '-1';
                sMessageInfo = 'Valid userId not found'
            }
    
            let sSetUser = 'SET ';
            if (sMessageInfo == '') {
                if (objUser.userName != '' && objUser.userName != undefined) {
                    sSetUser = sSetUser + ` name = "${objUser.userName}", `;
                } 
                if (objUser.imageFile == null || objUser.imageFile == '') {
                    sSetUser = sSetUser + ` imageFile = '', `;
                } else {
                    if (objUser.imageFile != '' && objUser.imageFile != undefined) {
                        sSetUser = sSetUser + ` imageFile = "${objUser.imageFile}", `;
                    }   
                }             
                
                let ultComma = sSetUser.lastIndexOf(",");
                if (ultComma > 0) {
                    sSetUser = sSetUser.substring(0,ultComma);  
                }     
            } 
    
            if (sUserId != '-1' && sSetUser == 'SET ') {
                sMessageInfo = 'No content to update';
            }
            if (sMessageInfo != '') {
                let myResult = {
                    messageInfo: sMessageInfo,
                    object: objUser
                };
                res.status(500).send(myResult);
            } else {
        
                let resUsers = '';
                let qry = `UPDATE login ${sSetUser} 
                            WHERE loginId = ${sUserId}  `;
    
                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            if (results.affectedRows == 0) {
                                sMessageInfo = 'No Records found' 
                             } else {
                                sMessageInfo = 'Record Updated'
                             }
         
                             let myResult = {
                                 messageInfo: sMessageInfo,
                                 sqlUser      : resUsers
                             };
                             res.status(200).send(myResult);
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).send(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(error);
                });
            }
        }
    };

    userUpdate(req);
}    

