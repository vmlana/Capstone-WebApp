const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns the user profile data
// ----------------------------------------------------------
exports.getSearch = (req, res) => {

    let search = async (req) => {

        let skeyWord = pivotDb.escape(req.query.keyword).replace(/['']+/g, '');
        if (skeyWord == "" || skeyWord.toLowerCase() == "null") {
            skeyWord = '';
        }

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }        

        let qry = `SELECT 'Playlists' AS origin,
                          p.playlistId AS itemId, p.name AS itemName, p.description AS itemDescription, l.name as instructorName, 
                          p.instructorId, l.imageFile as instructorImage, pi.imageFile AS itemImage, i.resume, null as itemDate
                     FROM playlists p
                          INNER JOIN instructors i  ON (p.instructorId = i.instructorId)
                          INNER JOIN login l ON (i.instructorId = l.loginId)  
                          INNER JOIN ( SELECT pl.playlistId, l.imageFile
                                         FROM playlistLessons pl 
                                              INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                                        ORDER BY pl.order
                                        LIMIT 1  ) pi ON (p.playlistId = pi.playlistId)                              
                    WHERE LOWER(p.name) LIKE "%${skeyWord}%" 
                       OR LOWER(description) LIKE "%${skeyWord}%"
                       OR LOWER(l.name) LIKE "%${skeyWord}%"     

                    UNION

                    SELECT 'Programs' AS origin,
                           g.groupBaseId AS itemId, g.name AS itemName, pi.playlistDescription AS itemDescription, 
                           pi.instructorName as instructorName, pi.instructorId as instructorId, pi.instructorImage as instructorImage, 
                           pi.playlistImage as itemImage, pi.resume, null as itemDate
                      FROM groupBase g
                           INNER JOIN companyPrograms cp ON (cp.groupBaseId = g.groupBaseId)
                           INNER JOIN employees e ON (cp.companyId = e.companyId)
                           INNER JOIN users u ON (e.employeeId = u.employeeId AND e.companyId = u.companyId)
                           INNER JOIN workDepartments w ON (e.workDepartmentId = w.workDepartmentId)
                           INNER JOIN companyProgramXworkDepartment pw ON (pw.groupBaseId = g.groupBaseId AND pw.workDepartmentId = e.workDepartmentId)       
                           INNER JOIN (SELECT groupBaseId, MIN(playlistId) as playlistId 
                                         FROM groupBasePlaylists x
                                        GROUP BY groupBaseId ) gp ON (g.groupBaseId = gp.groupBaseId)
                           INNER JOIN (SELECT p.playlistId AS playlistId, p.name AS itemName, p.description AS playlistDescription, l.name as instructorName, 
                                              p.instructorId, l.imageFile as instructorImage, pxi.imageFile AS playlistImage, i.resume
                                         FROM playlists p
                                              INNER JOIN instructors i  ON (p.instructorId = i.instructorId)
                                              INNER JOIN login l ON (i.instructorId = l.loginId)  
                                              INNER JOIN ( SELECT pl.playlistId, MIN(l.imageFile) as imageFile
                                                             FROM playlistLessons pl 
                                                                  INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                                                            GROUP BY pl.playlistId ) pxi ON (p.playlistId = pxi.playlistId)   
                                       ) pi ON (gp.playlistId = pi.playlistId)                              
                     WHERE u.userId = ${sUserId}
                       AND LOWER(g.name) LIKE "%${skeyWord}%" 

                     UNION 

                    SELECT 'Blogs' AS origin,
                           b.blogId AS itemId, b.title AS itemName, content AS itemDescription, l.name as instructorName, 
                           b.instructorId, l.imageFile as instructorImage, b.imageFileThumb as itemImage, i.resume, DATE_FORMAT(b.postDate, "%b %d %Y") as itemDate   
                      FROM blogs b
                           INNER JOIN instructors i  ON (b.instructorId = i.instructorId)
                           INNER JOIN login l ON (i.instructorId = l.loginId)
                     WHERE LOWER(b.title) LIKE "%${skeyWord}%" 
                        OR LOWER(b.content) LIKE "%${skeyWord}%" 
                        OR LOWER(l.name) LIKE "%${skeyWord}%" 
                        OR EXISTS ( SELECT 1
                                      FROM tags t
                                           INNER JOIN blogTags bt ON (bt.tagId = t.tagId)
                                     WHERE bt.blogId = b.blogId
                                       AND LOWER(t.name) LIKE "%${skeyWord}%" )
                    ORDER BY origin, itemName `;

        pivotPoolDb.then(pool => {
            pool.query(qry)
                .then(results => {
                    if (results.length == 0) {
                        res.status(404).send("No Record Found");
                    } else {
                        let vPlaylists   = [];
                        let vPrograms    = [];
                        let vBlogs       = [];
                        let vInstructors = [];
                        let myRecord     = {};
                        results.forEach(result => {
                            if (result.origin == 'Playlists') {
                                myRecord = {
                                    playlistId: result.itemId,
                                    playlistName: result.itemName,
                                    playlistDescription: result.itemDescription,
                                    imageFile: result.itemImage,                                       
                                    instructorName: result.instructorName,
                                    instructorId: result.instructorId,
                                    instructorImage: result.instructorImage
                                };                                
                                vPlaylists.push(myRecord)
                            } else if (result.origin == 'Programs') {
                                myRecord = {
                                    programId: result.itemId,
                                    programName: result.itemName,
                                    programDescription: result.itemDescription,
                                    imageFile: result.itemImage,                                       
                                    instructorName: result.instructorName,
                                    instructorId: result.instructorId,
                                    instructorImage: result.instructorImage
                                };                                   
                                vPrograms.push(myRecord)
                            } else if (result.origin == 'Blogs') {
                                myRecord = {
                                    blogId: result.itemId,
                                    blogName: result.itemName,
                                    blogDescription: result.itemDescription,
                                    blogImageFile: result.itemImage,                                       
                                    blogPostDate: result.itemDate,
                                    instructorName: result.instructorName,
                                    instructorId: result.instructorId,
                                    instructorImage: result.instructorImage
                                };                                  
                                vBlogs.push(myRecord)
                            }

                            let obj = vInstructors.find(o => o.instructorId === result.instructorId);
                            if (obj==undefined) {
                                myRecord = {
                                    instructorName: result.instructorName,
                                    instructorId: result.instructorId,
                                    instructorImage: result.instructorImage,
                                    instructorResume: result.resume
                                };                                
                                vInstructors.push(myRecord)                                
                            }
                        });

                        let myResult = {
                            keyword: skeyWord,
                            instructors: vInstructors,
                            playlists: vPlaylists,
                            programs: vPrograms,
                            blogs: vBlogs
                         }

                        res.status(200).send(myResult);
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

    search(req);
};


