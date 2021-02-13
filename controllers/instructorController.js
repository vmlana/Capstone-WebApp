const { pivotDb, pivotPoolDb } = require("../connection.js");

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


