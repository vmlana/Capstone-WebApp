const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns a list of all Playlists
// ----------------------------------------------------------
exports.getPlaylists = (req, res) => {

    let sPlaylistId = pivotDb.escape(req.query.playlistId).replace(/['']+/g, '');
    let sCategoryId = pivotDb.escape(req.query.categoryId).replace(/['']+/g, '');
    let sInstructorId = pivotDb.escape(req.query.instructorId).replace(/['']+/g, '');

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

    let qry = `SELECT p.playlistId, p.name as playlistName, p.description as playlistDescription,
                      c.categoryId, c.name as categoryName, lg.name as instructorName,
                      l.lessonId, l.name as lessonName, pl.order as lessonOrder, l.imageFile, l.videoFile, l.description as lessonDescription,
                      CASE WHEN p.level = "B" THEN "Begginer"
                           WHEN p.level = "I" THEN "Intermediate"
                           WHEN p.level = "A" THEN "Advanced"
                      ELSE "All Levels" END AS playlistLevel
                 FROM playlists p
                      INNER JOIN playlistLessons pl ON (p.playlistId = pl.playlistId)
                      INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                      INNER JOIN instructors i ON (p.instructorId = i.instructorId)
                      INNER JOIN categories c ON (p.categoryId = c.categoryId)
                      INNER JOIN login lg ON (i.instructorId = lg.loginId)
                ${sWhere}                           
                ORDER BY playlistId, lessonOrder `;

    pivotPoolDb.then(pool => {
        pool.query(qry)
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
                        let iPlaylistBase = i;
                        iPlaylistId = results[iPlaylistBase].playlistId;

                        // Creates array of all the lessons for the playlist
                        while (i < results.length && iPlaylistId == results[i].playlistId) {
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
