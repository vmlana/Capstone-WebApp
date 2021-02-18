const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns the user profile data
// ----------------------------------------------------------
exports.getUser = (req, res) => {

    let userSearch = async (req) => {

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }

        let qry = `SELECT u.userId, l.userLogin, l.name as userName, l.imageFile as userImageFile, u.employeeId,
                          c.companyId, lc.name as companyName
                     FROM users u
                          INNER JOIN login l ON (u.userId = l.loginId)
                          INNER JOIN employees e ON (u.companyId = e.companyId AND u.employeeId = e.employeeId)
                          INNER JOIN companies c ON (u.companyId = c.companyId)
                          INNER JOIN login lc ON (c.companyId = lc.loginId)
                    WHERE u.userId = ${sUserId} `;

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

    userSearch(req);
};


