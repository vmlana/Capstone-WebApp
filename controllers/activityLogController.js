const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult} = require("express-validator");


// ----------------------------------------------------------
// Register activity Log for users
// ----------------------------------------------------------
exports.activityLog = (req, res) => {

    let registerLog = async (req) => {

        const valError = validationResult(req).array();
        //console.log(valError);

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else { 

            let sMessageInfo  = ''; 
            let objLog = req.body;
            console.log(objLog);
    
            let sUserId = pivotDb.escape(objLog.userId).replace(/['']+/g, '');
            if (sUserId == "" || sUserId.toLowerCase() == "null") {
                sUserId = '-1';
                sMessageInfo = 'Valid userId not found'
            }

            let sProgramId = pivotDb.escape(objLog.programId).replace(/['']+/g, '');
            if (sProgramId == "" || sProgramId.toLowerCase() == "null") {
                sProgramId = 'null';
            }

            let sPlaylistId = pivotDb.escape(objLog.playlistId).replace(/['']+/g, '');
            if (sPlaylistId == "" || sPlaylistId.toLowerCase() == "null") {
                sPlaylistId = 'null';
            }

            let sLessonId = pivotDb.escape(objLog.lessonId).replace(/['']+/g, '');
            if (sLessonId == "" || sLessonId.toLowerCase() == "null") {
                sLessonId = 'null';
            }            
    
            // Set current date time
            var currentdate = new Date();
            let sDate = zeroPad(currentdate.getFullYear(),4) + '-' +
                        zeroPad((currentdate.getMonth()+1),2) + '-' + 
                        zeroPad(currentdate.getDate(),2) + ' ' + 
                        currentdate.getHours() + ":" + 
                        currentdate.getMinutes() + ":" + 
                        currentdate.getSeconds();

            if (sMessageInfo == '') {
                qry = `INSERT INTO activityLog (userId, groupBaseId, playlistId, lessonId, logDate) 
                            VALUES (${sUserId}, ${sProgramId},  ${sPlaylistId}, ${sLessonId}, "${sDate}" ) `;

                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            if (results.affectedRows == 0) {
                               sMessageInfo = 'No Records found' 
                            } else {
                               sMessageInfo = 'Record Inserted'
                            }

                            let myResult = {
                                messageInfo: sMessageInfo,
                                sqlResult  : results
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
            } else {
                console.log(error);
                res.status(500).send(sMessageInfo);
            }
        }
    };

    registerLog(req);
}    


const zeroPad = (num, places) => String(num).padStart(places, '0');



