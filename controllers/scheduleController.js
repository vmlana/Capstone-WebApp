const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");


// ----------------------------------------------------------
// Returns the scheduled sessions for a user
// ----------------------------------------------------------
exports.getSchedule = (req, res) => {

    let scheduleSearch = async (req) => {

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }

        let sPlaylistId = pivotDb.escape(req.query.playlistId).replace(/['']+/g, '');
        if (sPlaylistId == "" || sPlaylistId.toLowerCase() == "null") {
            sPlaylistId = '';
        } else {
            sPlaylistId = ` AND pl.playlistId = ${sPlaylistId} `;
        }

        let qry = `SELECT s.userId, s.scheduleDate, s.reminderMinutes,
                          s.programId, gb.name as programName,
                          s.playlistId, pl.name as playlistName
                    FROM schedules s
                         LEFT JOIN companyPrograms cp ON (s.programId = cp.groupBaseId)
                         LEFT JOIN groupBase gb ON (cp.groupBaseId = gb.groupBaseId)
                         LEFT JOIN playlists pl ON (s.playlistId = pl.playlistId)
                   WHERE s.userId = ${sUserId} 
                         ${sPlaylistId}
                   ORDER BY scheduleDate DESC  `;

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

    scheduleSearch(req);
};



// ----------------------------------------------------------
// Register activity Log for users
// ----------------------------------------------------------
exports.addSchedule = (req, res) => {

    let fAddSchedule = async (req) => {

        const valError = validationResult(req).array();
        //console.log(valError);

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else {

            let sMessageInfo = '';
            let objLog = req.body;

            let sUserId = pivotDb.escape(objLog.userId).replace(/['']+/g, '');
            if (sUserId == "" || sUserId.toLowerCase() == "null") {
                sUserId = '-1';
                sMessageInfo = 'Valid userId not found'
            }

            let sProgramId = pivotDb.escape(objLog.programId).replace(/['']+/g, '');
            let sOperProg = " = ";
            if (sProgramId == "" || sProgramId.toLowerCase() == "null") {
                sProgramId = 'null';
                sOperProg = " IS "
            }

            let sPlaylistId = pivotDb.escape(objLog.playlistId).replace(/['']+/g, '');
            let sOperPlay = " = ";
            if (sPlaylistId == "" || sPlaylistId.toLowerCase() == "null") {
                sPlaylistId = 'null';
                sOperPlay = " IS ";
            }

            let sScheduleDate = pivotDb.escape(objLog.scheduleDate).replace(/['']+/g, '');

            // Convert from time zone to UTC 
            if (sScheduleDate.length > 20) {
                let sDate = sScheduleDate.substr(0, 10);
                let sTime = sScheduleDate.substr(11, 8);
                sScheduleDate = sDate + ' ' + sTime;
            }

            let sReminderMinutes = pivotDb.escape(objLog.reminderMinutes).replace(/['']+/g, '');

            if (sMessageInfo == '') {
                qry = `SELECT *
                         FROM schedules
                        WHERE userId = ${sUserId}
                          AND programId ${sOperProg} ${sProgramId}
                          AND playlistId ${sOperPlay} ${sPlaylistId}
                          AND CAST(scheduleDate AS char) = "${sScheduleDate}" `;

                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            return results;
                        })
                        .then(results => {
                            if (results.length == 0) {
                                qry = `INSERT INTO schedules (userId, programId, playlistId, scheduleDate, reminderMinutes) 
                                VALUES (${sUserId}, ${sProgramId}, ${sPlaylistId}, "${sScheduleDate}", ${sReminderMinutes} ) `;
                            } else {
                                qry = `UPDATE schedules SET reminderMinutes = ${sReminderMinutes}
                                        WHERE userId = ${sUserId}
                                          AND programId ${sOperProg} ${sProgramId}
                                          AND playlistId ${sOperPlay} ${sPlaylistId}
                                          AND CAST(scheduleDate AS char) = "${sScheduleDate}" `;
                            }

                            return pool.query(qry);
                        })
                        .then(results => {
                            if (results.affectedRows == 0) {
                                sMessageInfo = 'No Records found'
                            } else {
                                sMessageInfo = 'Record Inserted'
                            }

                            let myResult = {
                                messageInfo: sMessageInfo,
                                sqlResult: results
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

    fAddSchedule(req);
}



// ----------------------------------------------------------
// Remove Schedule for users
// ----------------------------------------------------------
exports.delSchedule = (req, res) => {

    let fDelSchedule = async (req) => {

        let sScheduleId = pivotDb.escape(req.query.scheduleId).replace(/['']+/g, '');
        if (sScheduleId == "" || sScheduleId.toLowerCase() == "null") {
            sScheduleId = '-1';
        }

        if (sScheduleId == undefined || sScheduleId == '-1') {
            res.status(500).send('Cannot identify property scheduleId');
        } else {

            qry = `DELETE FROM schedules 
                    WHERE scheduleId = ${sScheduleId} `;

            pivotPoolDb.then(pool => {
                pool.query(qry)
                    .then(results => {
                        return results;
                    })
                    .then(results => {

                        if (results.affectedRows == 0) {
                            sMessageInfo = 'No Records found'
                        } else {
                            sMessageInfo = 'Record Deleted'
                        }

                        let myResult = {
                            messageInfo: sMessageInfo,
                            sqlResult: results
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
    };

    fDelSchedule(req);
}


