const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult} = require("express-validator");


// ----------------------------------------------------------
// Returns the instructor profile data
// ----------------------------------------------------------
exports.getInstructor = (req, res) => {

    let instructorSearch = async (req) => {

        let sInstructorId = pivotDb.escape(req.query.instructorId).replace(/['']+/g, '');
        if (sInstructorId == "" || sInstructorId.toLowerCase() == "null") {
            sInstructorId = '-1';
        }

        let qry = `SELECT i.instructorId, l.userLogin, l.name as instructorName, i.resume, i.specializationArea, i.phoneNumber, i.address, ct.name as cityName, 
                          p.name as provinceName, p.provinceId as provinceCode, i.postalCode, l.imageFile
                     FROM instructors i
                          INNER JOIN login l ON (i.instructorId = l.loginId)
                          LEFT OUTER JOIN cities ct ON (i.cityId = ct.cityId)
                          LEFT OUTER JOIN provinces p ON (ct.provinceId = p.provinceId)
                    WHERE i.instructorId = ${sInstructorId} `;

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

    instructorSearch(req);
};



// ----------------------------------------------------------
// Updates the instructor profile data
// ----------------------------------------------------------
exports.updInstructor = (req, res) => {

    let instructorUpdate = async (req) => {

        const valError = validationResult(req).array();
        //console.log(valError);

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else { 

            let sMessageInfo  = ''; 
            let objInstructor = req.body;
            //console.log(objInstructor);
    
            let sInstructorId = pivotDb.escape(objInstructor.instructorId).replace(/['']+/g, '');
            if (sInstructorId == "" || sInstructorId.toLowerCase() == "null") {
                sInstructorId = '-1';
                sMessageInfo = 'Valid instructorId not found'
            }
    
            let sSet = 'SET ';        
            if (sMessageInfo == '') {
                if (objInstructor.resume != undefined) {
                    sSet = sSet + ` resume = "${objInstructor.resume}", `;
                }
                if (objInstructor.specializationArea != undefined) {
                    sSet = sSet + `specializationArea = "${objInstructor.specializationArea}", `;
                }            
                if (objInstructor.phoneNumber != undefined) {
                    sSet = sSet + `phoneNumber = "${objInstructor.phoneNumber}", `;
                }              
                if (objInstructor.address != undefined) {
                    sSet = sSet + `address = "${objInstructor.address}", `;
                }              
                if (objInstructor.postalCode != undefined) {
                    sSet = sSet + `postalCode = "${objInstructor.postalCode}", `;
                }                
                if (objInstructor.cityName != '' && objInstructor.cityName != undefined && 
                    objInstructor.provinceCode != '' && objInstructor.provinceCode != undefined) {
                    sSet = sSet + `cityId = ( SELECT cityId FROM cities 
                                               WHERE provinceId = "${objInstructor.provinceCode}" 
                                                 AND name = "${objInstructor.cityName.toLowerCase()}" ) , `;
                } 
    
                let ultComma = sSet.lastIndexOf(",");
                if (ultComma > 0) {
                    sSet = sSet.substring(0,ultComma);  
                }   
            }
    
            let sSetUser = 'SET ';
            if (sMessageInfo == '') {
                if (objInstructor.instructorName != '' && objInstructor.instructorName != undefined) {
                    sSetUser = sSetUser + ` name = "${objInstructor.instructorName}", `;
                } 
                if (objInstructor.imageFile != '' && objInstructor.imageFile != undefined) {
                    sSetUser = sSetUser + ` imageFile = "${objInstructor.imageFile}", `;
                }       
                let ultComma = sSetUser.lastIndexOf(",");
                if (ultComma > 0) {
                    sSetUser = sSetUser.substring(0,ultComma);  
                }     
            } 
    
            if (sInstructorId != '-1' && sSet == 'SET ' && sSetUser == 'SET ') {
                sMessageInfo = 'No content to update';
            }
            if (sMessageInfo != '') {
                let myResult = {
                    messageInfo: sMessageInfo,
                    object: objInstructor
                };
                res.status(500).send(myResult);
            } else {
        
                let resInstructors = '';
                let resUsers = '';
                let qry = `UPDATE instructors ${sSet} 
                            WHERE instructorId = ${sInstructorId}  `;
    
                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            resInstructors = results;
                            if (resInstructors.affectedRows == 0) {
                               sMessageInfo = 'No Records found' 
                            } else {
                               sMessageInfo = 'Record Updated'
                            }
                        })
                        .then(results => {
                            if (sSetUser != 'SET ') {
                                let qry = `UPDATE login ${sSetUser} 
                                            WHERE loginId = ${sInstructorId}  `;
                                 return pool.query(qry);
                            }
                        })
                        .then(results => {
                            resUsers = results;
                            if (sSetUser != 'SET ' && resUsers.affectedRows == 0) {
                                sMessageInfo = 'No Records found' 
                             } else {
                                sMessageInfo = 'Record Updated'
                             }
         
                             let myResult = {
                                 messageInfo: sMessageInfo,
                                 sqlInstructor: resInstructors,
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

    instructorUpdate(req);
}    



