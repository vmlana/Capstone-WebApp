const { pivotDb, pivotPoolDb } = require("../connection.js");


// ----------------------------------------------------------------
// Returns a list of all Programs available for a especific userId
// ----------------------------------------------------------------
// Parameters:
//      userId      - user identification  ( Required )
//      programId   - program identification 
// ----------------------------------------------------------------
exports.getPrograms = (req, res) => {

    let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
    let sProgramId = pivotDb.escape(req.query.programId).replace(/['']+/g, '');

    // Set filters
    let sWhere = " WHERE p.active = 1 ";
    if (sUserId != "" && sUserId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND e.employeeId = '${sUserId}' `;       //    AND e.employeeId = '100350049' AND e.employeeId = '100346354'
    } else {
        sWhere = sWhere + ` AND e.employeeId = '-1' `;
    }
    if (sProgramId != "" && sProgramId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND cp.groupBaseId = ${sProgramId} `;
    }


    let qry = `SELECT e.name as employeeName, e.employeeId, w.name as departmentName,
                      gb.groupbaseId as programId, gb.name as programName, gb.initialDate, gb.endDate, gb.dayOfWeek, gb.frequency,
                      p.playlistId, p.name as playlistName, p.description as playlistDescription, gp.order as playlistOrder,
                      c.categoryId, c.name as categoryName, lg.name as instructorName,
                      l.lessonId, l.name as lessonName, pl.order as lessonOrder, l.imageFile, l.videoFile, l.description as lessonDescription,
                 CASE WHEN p.level = "B" THEN "Begginer"
                      WHEN p.level = "I" THEN "Intermediate"
                      WHEN p.level = "A" THEN "Advanced"
                 ELSE "All Levels" END AS playlistLevel
                 FROM companyPrograms cp
                      INNER JOIN groupBase gb on (cp.groupBaseId = gb.groupBaseId)
                      INNER JOIN groupBasePlaylists gp ON (gb.groupBaseId = gp.groupBaseId)
                      INNER JOIN playlists p ON (gp.playlistId = p.playlistId)
                      INNER JOIN playlistLessons pl ON (p.playlistId = pl.playlistId)
                      INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                      INNER JOIN instructors i ON (p.instructorId = i.instructorId)
                      INNER JOIN categories c ON (p.categoryId = c.categoryId)
                      INNER JOIN login lg ON (i.instructorId = lg.loginId)
                      INNER JOIN employees e ON (cp.companyId = e.companyId)
                      INNER JOIN workDepartments w ON (e.workDepartmentId = w.workDepartmentId)
                      INNER JOIN companyProgramXworkDepartment pw ON (pw.groupBaseId = gb.groupBaseId AND pw.workDepartmentId = e.workDepartmentId)
                      ${sWhere}   
                ORDER BY programName, playlistOrder, lessonOrder `;


    pivotPoolDb.then(pool => {
        pool.query(qry)
            .then(results => {
                if (results.length == 0) {
                    res.status(404).send("No Record Found");
                } else {

                    let vPrograms = [];
                    let iPlaylistId = -1;
                    let iProgramId  = -1;
                    let i = 0;

                    while (i < results.length) {

                        let vProgram     = {};
                        let vPlaylists   = [];  
                        let iProgramBase = i;
                        iProgramId  = results[iProgramBase].programId;  

                        // Creates array of all the playlists for the program
                        while (i < results.length && iProgramId == results[i].programId ) {

                            let vPlaylist = {};
                            let vLessons  = [];
                            let iPlaylistBase = i;
                            iPlaylistId = results[iPlaylistBase].playlistId;

                            // Creates array of all the lessons for the playlist
                            while (i < results.length && iProgramId == results[i].programId && iPlaylistId == results[i].playlistId) {
                                vLessons.push({
                                    lessonId: results[i].lessonId,
                                    lessonName: results[i].lessonName,
                                    lessonOrder: results[i].lessonOrder,
                                    lessonDescription: results[i].lessonDescription,
                                    imageFile: results[i].imageFile,
                                    videoFile: results[i].videoFile
                                });
                                i++;
                            }

                            vPlaylist = {
                                playlistId: results[iPlaylistBase].playlistId,
                                playlistName: results[iPlaylistBase].playlistName,
                                playlistDescription: results[iPlaylistBase].playlistDescription,
                                playlistLevel: results[iPlaylistBase].playlistLevel,
                                categoryName: results[iPlaylistBase].categoryName,
                                instructorName: results[iPlaylistBase].instructorName,
                                lessons: vLessons
                            };

                            vPlaylists.push(vPlaylist);
                        };

                        vProgram = {
                            programId: results[iProgramBase].programId,
                            programName: results[iProgramBase].programName,
                            initialDate: results[iProgramBase].initialDate,
                            endDate: results[iProgramBase].endDate,
                            dayOfWeek: results[iProgramBase].dayOfWeek,
                            frequency: results[iProgramBase].frequency,                                                                                    
                            playlists: vPlaylists
                        };

                        vPrograms.push(vProgram);
                    };

                    res.status(200).send(vPrograms);
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
