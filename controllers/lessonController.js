const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");


// ----------------------------------------------------------
// Returns a list of all Lessons
// ----------------------------------------------------------
exports.getLessons = (req, res) => {

    let sLessonId = pivotDb.escape(req.query.lessonId).replace(/['']+/g, '');
    let sCategoryId = pivotDb.escape(req.query.categoryId).replace(/['']+/g, '');
    let sInstructorId = pivotDb.escape(req.query.instructorId).replace(/['']+/g, '');


    // Set filters
    let sWhere = " WHERE 1 = 1 ";
    if (sLessonId != "" && sLessonId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND l.lessonId = ${sLessonId} `;
    }
    if (sCategoryId != "" && sCategoryId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND l.categoryId = ${sCategoryId} `;
    }
    if (sInstructorId != "" && sInstructorId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND l.instructorId = ${sInstructorId} `;
    }

    let qry = `SELECT l.lessonId, l.name as lessonName, l.description, l.imageFile, l.videoFile,
                      c.categoryId, c.name as categoryName, c.imageFile as categoryImageFile,
                      i.instructorId, lg.name as instructorName, lg.imageFile as instructorImage
                 FROM lessons l
                      INNER JOIN categories c ON (l.categoryId = c.categoryId)  
                      INNER JOIN instructors i ON (l.instructorId = i.instructorId)
                      INNER JOIN login lg ON (i.instructorId = lg.loginId)                  
                ${sWhere}                           
                ORDER BY lessonName `;

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





// ----------------------------------------------------------
// Updates the Lesson data
// ----------------------------------------------------------
exports.updLesson = (req, res) => {

    let lessonUpdate = async (req) => {

        const valError = validationResult(req).array();

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else { 

            let sMessageInfo  = ''; 
            let qry = '';            
            let objLesson = req.body;
    
            let sLessonId = pivotDb.escape(objLesson.lessonId).replace(/['']+/g, '');
            let sAction   = pivotDb.escape(objLesson.action).replace(/['']+/g, '');            
            
            if (sAction.toLowerCase() == 'add') {
                qry = `INSERT INTO lessons (name, description, imageFile, videoFile, categoryId, instructorId) 
                            VALUES ("${objLesson.lessonName}", "${objLesson.description}",  "${objLesson.imageFile}", 
                                    "${objLesson.videoFile}", ${objLesson.categoryId}, ${objLesson.instructorId} ) `;
            } else if (sAction.toLowerCase() == 'del') {
                qry = `DELETE FROM lessons WHERE lessonId = ${sLessonId} `;
            } else {

                if (sLessonId == "" || sLessonId.toLowerCase() == "null") {
                    sLessonId = '-1';
                    sMessageInfo = 'Valid lessonId not found'
                }
        
                let sSet = 'SET ';        
                if (sMessageInfo == '') {
                    if (objLesson.lessonName != undefined) {
                        sSet = sSet + ` name = "${objLesson.lessonName}", `;
                    }
                    if (objLesson.description != undefined) {
                        sSet = sSet + `description = "${objLesson.description}", `;
                    }            
                    if (objLesson.imageFile != undefined) {
                        sSet = sSet + `imageFile = "${objLesson.imageFile}", `;
                    }              
                    if (objLesson.videoFile != undefined) {
                        sSet = sSet + `videoFile = "${objLesson.videoFile}", `;
                    }              
                    if (objLesson.categoryId != undefined) {
                        sSet = sSet + `categoryId = "${objLesson.categoryId}", `;
                    }  
                    if (objLesson.instructorId != undefined) {
                        sSet = sSet + `instructorId = "${objLesson.instructorId}", `;
                    }                  
                }

                if (sLessonId != '-1' && sSet == 'SET ' ) {
                    sMessageInfo = 'No content to update';
                }
                
                sSet = removeLastComma(sSet);
                qry = `UPDATE lessons ${sSet} 
                        WHERE lessonId = ${sLessonId}  `;
            }


            if (sMessageInfo != '') {
                let myResult = {
                    messageInfo: sMessageInfo,
                    object: objLesson
                };
                res.status(500).send(myResult);
            } else {
                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            
                            if (results.affectedRows == 0) {
                                sMessageInfo = 'No Records found' 
                             } else {
                                if (sAction.toLowerCase() == 'add') {
                                    sMessageInfo = 'Record Inserted'
                                } else if (sAction.toLowerCase() == 'del') {
                                    sMessageInfo = 'Record Deleted'
                                } else {
                                    sMessageInfo = 'Record Updated'
                                }
                             }
         
                             let myResult = {
                                 messageInfo: sMessageInfo,
                                 sqlInstructor: results
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

    lessonUpdate(req);
}    



//---------------------------------------------------------
// Internal function to remove the last comma from a string
//---------------------------------------------------------
function removeLastComma(myString) {
    let ultComma = myString.lastIndexOf(",");
    if (ultComma > 0) {
        myString = myString.substring(0, ultComma);
    }
    return myString;
}

