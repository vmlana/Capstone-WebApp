const { pivotDb, pivotPoolDb } = require("../connection.js");

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

