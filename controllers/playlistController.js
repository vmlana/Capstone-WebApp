const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");

// ----------------------------------------------------------
// Returns a list of all Playlists
// ----------------------------------------------------------
exports.getPlaylists = (req, res) => {

    let sPlaylistId   = pivotDb.escape(req.query.playlistId).replace(/['']+/g, '');
    let sCategoryId   = pivotDb.escape(req.query.categoryId).replace(/['']+/g, '');
    let sInstructorId = pivotDb.escape(req.query.instructorId).replace(/['']+/g, '');
    let sMostViewed   = pivotDb.escape(req.query.mostViewed).replace(/['']+/g, '');
    let sOrderBy      = pivotDb.escape(req.query.orderby).replace(/['']+/g, '');    


    // Set filters
    let sWhere = " WHERE p.active = 1 ";
    if (sPlaylistId != "" && sPlaylistId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND p.playlistId = ${sPlaylistId} `;
    }
    if (sCategoryId != "" && sCategoryId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND p.categoryId = ${sCategoryId} `;
    }
    if (sInstructorId != "" && sInstructorId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND p.instructorId = ${sInstructorId} `;
    }

    let sMyOrderBy = '';
    if (sOrderBy != "" && sOrderBy.toLowerCase() != "null") {
        sMyOrderBy = sOrderBy + `, `;
    }

    let sMyMostViewed = '';
    if (sMostViewed != "" && sMostViewed.toLowerCase() == "true") {
        sMyMostViewed = 'playlistViews DESC, ';
    }

    let sQryOrderBy = `ORDER BY ${sMyMostViewed} ${sMyOrderBy} playlistName, playlistId, lessonOrder, lessonId, otherPlaylistName `;


    let qry = `SELECT p.playlistId, p.name as playlistName, p.description as playlistDescription, log.qtd as playlistViews,
                      c.categoryId, c.name as categoryName, lg.name as instructorName, i.instructorId as instructorID, l.videoDuration,
                      l.lessonId, l.name as lessonName, pl.order as lessonOrder, l.imageFile, l.videoFile, l.description as lessonDescription,
                      p.publishedDate,
                      CASE WHEN p.level = "B" THEN "Begginer"
                           WHEN p.level = "I" THEN "Intermediate"
                           WHEN p.level = "A" THEN "Advanced"
                      ELSE "All Levels" END AS playlistLevel,
                      opl.playlistId AS otherPlaylistId, opl.name as otherPlaylistName, opl.imageFile as otherImageFile
                 FROM playlists p
                      INNER JOIN playlistLessons pl ON (p.playlistId = pl.playlistId)
                      INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                      INNER JOIN instructors i ON (p.instructorId = i.instructorId)
                      INNER JOIN categories c ON (p.categoryId = c.categoryId)
                      INNER JOIN login lg ON (i.instructorId = lg.loginId)
                      LEFT JOIN ( SELECT playlistId, count(*) as qtd
                                    FROM (SELECT DISTINCT userId, DATE(logDate) as logDate, playlistId
                                            FROM activityLog ) a
                                   GROUP BY playlistId 
                                 ) log ON ( p.playlistId = log.playlistId )  
                      LEFT JOIN ( SELECT p2.playlistId, p2.name, p2.instructorId, l2.imageFile
                                    FROM playlists p2
                                         INNER JOIN playlistLessons pl2 ON (pl2.playlistId = p2.playlistId AND pl2.order = 1)
                                         INNER JOIN lessons l2 ON (l2.lessonId = pl2.lessonId)                                    
                                   WHERE active = 1 ) opl ON (opl.instructorId = p.instructorId AND opl.playlistId <> p.playlistId)                                                     
                ${sWhere}                           
                ${sQryOrderBy} `;

            // Setting the timezone here so prevent restarting the database server on presentation day                        
            let qrySetTimezone = `SET time_zone = "-07:00"`;

    pivotPoolDb.then(pool => {
            pool.query(qrySetTimezone)
            .then(results => {
                return pool.query(qry);
            })
            .then(results => {
                if (results.length == 0) {
                    res.status(404).send("No Record Found");
                } else {

                    let vPlaylists = [];
                    let iPlaylistId = -1;
                    let i = 0;

                    while (i < results.length) {
                        let vPlaylist = {};
                        let vLessons = [];
                        let vRelatedPlaylists = [];
                        let iPlaylistBase = i;
                        let iImageBase = -1;
                        iPlaylistId = results[iPlaylistBase].playlistId;

                        // Creates array of all the lessons for the playlist
                        while (i < results.length && iPlaylistId == results[i].playlistId) {

                            vRelatedPlaylists = [];
                            let iLessonBase = i;
                            let iLessonId = results[iLessonBase].lessonId;

                            // Creates array of all the other playlists related to the same instructor
                            while (i < results.length && iPlaylistId == results[i].playlistId && iLessonId == results[i].lessonId) {

                                if (iImageBase == -1) {
                                    iImageBase = i;
                                }
                                if (results[i].otherPlaylistId > 0 && results[i].otherPlaylistId != undefined) {
                                    vRelatedPlaylists.push({
                                        playlistId: results[i].otherPlaylistId,
                                        playlistName: results[i].otherPlaylistName,
                                        imageFile: results[i].otherImageFile
                                    });
                                }

                                i++;
                            }

                            vLessons.push({
                                lessonId: results[iLessonBase].lessonId,
                                lessonName: results[iLessonBase].lessonName,
                                lessonOrder: results[iLessonBase].lessonOrder,
                                lessonDescription: results[iLessonBase].lessonDescription,
                                videoDuration: results[iLessonBase].videoDuration,
                                imageFile: results[iLessonBase].imageFile,
                                videoFile: results[iLessonBase].videoFile
                            });

                        }

                        vPlaylist = {
                            playlistId: results[iPlaylistBase].playlistId,
                            playlistName: results[iPlaylistBase].playlistName,
                            playlistDescription: results[iPlaylistBase].playlistDescription,
                            playlistLevel: results[iPlaylistBase].playlistLevel,
                            playlistViews: results[iPlaylistBase].playlistViews,
                            imageFile: results[iImageBase].imageFile,                            
                            categoryId: results[iPlaylistBase].categoryId,
                            categoryName: results[iPlaylistBase].categoryName,
                            instructorName: results[iPlaylistBase].instructorName,
                            instructorID: results[iPlaylistBase].instructorID,
                            publishedDate: results[iPlaylistBase].publishedDate,
                            lessons: vLessons,
                            relatedPlaylists: vRelatedPlaylists
                        };

                        vPlaylists.push(vPlaylist);
                    };

                    res.status(200).send(vPlaylists);
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
// Updates the Playlist data
// ----------------------------------------------------------
exports.updPlaylist = (req, res) => {

    let playlistUpdate = async (req) => {

        const valError = validationResult(req).array();

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else {

            let sMessageInfo = '';
            let qry = '';
            let objPlaylist = req.body;

            let sPlaylistId = pivotDb.escape(objPlaylist.playlistId).replace(/['']+/g, '');
            let sAction = pivotDb.escape(objPlaylist.action).replace(/['']+/g, '');

            let sLevel = objPlaylist.playlistLevel[0].toUpperCase();

            if (sAction.toLowerCase() == 'add') {
                qry = `INSERT INTO playlists (name, description, categoryId, instructorId, level, active) 
                            VALUES ("${objPlaylist.playlistName}", "${objPlaylist.playlistDescription}", ${objPlaylist.categoryId},
                                     ${objPlaylist.instructorId}, "${sLevel}", ${objPlaylist.active} ) `;
            } else if (sAction.toLowerCase() == 'del') {
                qry = `DELETE FROM playlistLessons WHERE playlistId = ${sPlaylistId} `;
            } else {

                if (sPlaylistId == "" || sPlaylistId.toLowerCase() == "null") {
                    sPlaylistId = '-1';
                    sMessageInfo = 'Valid playlistId not found'
                }

                let sSet = 'SET ';
                if (sMessageInfo == '') {
                    if (objPlaylist.playlistName != undefined) {
                        sSet = sSet + ` name = "${objPlaylist.playlistName}", `;
                    }
                    if (objPlaylist.description != undefined) {
                        sSet = sSet + `description = "${objPlaylist.playlistDescription}", `;
                    }
                    if (objPlaylist.playlistLevel != undefined) {
                        sSet = sSet + `level = "${sLevel}", `;
                    }
                    if (objPlaylist.active != undefined) {
                        sSet = sSet + `active = "${objPlaylist.active}", `;
                    }
                    if (objPlaylist.categoryId != undefined) {
                        sSet = sSet + `categoryId = "${objPlaylist.categoryId}", `;
                    }
                    if (objPlaylist.instructorId != undefined) {
                        sSet = sSet + `instructorId = "${objPlaylist.instructorId}", `;
                    }
                }

                if (sPlaylistId != '-1' && sSet == 'SET ') {
                    sMessageInfo = 'No content to update';
                }

                sSet = removeLastComma(sSet);
                qry = `UPDATE playlists ${sSet} 
                        WHERE playlistId = ${sPlaylistId}  `;
            }


            if (sMessageInfo != '') {
                let myResult = {
                    messageInfo: sMessageInfo,
                    object: objPlaylist
                };
                res.status(500).send(myResult);
            } else {
                let mainResult = [];
                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {

                            if (results.affectedRows == 0) {
                                sMessageInfo = 'No Records found'
                            } else {
                                if (sAction.toLowerCase() == 'add') {
                                    sMessageInfo = 'Record Inserted';
                                    sPlaylistId = results.insertId;
                                } else if (sAction.toLowerCase() == 'del') {
                                    sMessageInfo = 'Record Deleted';
                                } else {
                                    sMessageInfo = 'Record Updated';
                                }
                            }
                            mainResult = results;
                            return results;

                        })
                        .then(results => {
                            if (sAction.toLowerCase() == 'del') {
                                let qry = `DELETE FROM playlists WHERE playlistId = ${sPlaylistId}  `;
                                return pool.query(qry);
                            } else {
                                return playlistLessonUpdate(sPlaylistId, objPlaylist.lessons);
                            }
                        })
                        .then(results => {
                            let myResult = {
                                messageInfo: sMessageInfo,
                                mainResult: mainResult,
                                detailResult: results
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

    playlistUpdate(req);
};





// -------------------------------------------------------------
// Updates the list of company employees on the company profile
// -------------------------------------------------------------
let playlistLessonUpdate = async (playlistId, lessons) => {

    let qry = `DELETE FROM playlistLessons WHERE playlistId = ${playlistId} `;
    pivotPoolDb.then(pool => {
        pool.query(qry)
            .then(results => {
                lessons.forEach(element => {
                    let qry = `INSERT INTO playlistLessons (playlistId, lessonId) 
                                    VALUES (${playlistId}, ${element.lessonId})  `;
                    pool.query(qry);                    
               });
                return `${lessons.length}  updated`;
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    })
    .catch(error => {
        console.log(error);
        return error;
    });
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

