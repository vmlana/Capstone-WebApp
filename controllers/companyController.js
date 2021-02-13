const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns the company profile data
// ----------------------------------------------------------
exports.getCompany = (req, res) => {

    let companySearch = async (req) => {

        let sCompanyId = pivotDb.escape(req.query.companyId).replace(/['']+/g, '');
        if (sCompanyId == "" || sCompanyId.toLowerCase() == "null") {
            sCompanyId = '-1';
        }

        let vCompany = {};
        let vEmployees = [];
        let vResult = {};

        let qry = `SELECT c.companyId, l.userLogin, l.name as companyName, c.accountResponsible, c.contactEmail, c.phoneNumber, c.address, ct.name as cityName, 
                      p.name as provinceName, p.provinceId as provinceCode, c.postalCode, l.imageFile
                 FROM companies c
                      INNER JOIN login l ON (c.companyId = l.loginId)
                      LEFT OUTER JOIN cities ct ON (c.cityId = ct.cityId)
                      LEFT OUTER JOIN provinces p ON (ct.provinceId = p.provinceId)
                WHERE c.companyId = ${sCompanyId} `;

        pivotPoolDb.then(pool => {
            pool.query(qry)
                .then(results => {
                    if (results.length == 0) {
                        vCompany = {}
                    } else {
                        vCompany = results[0];
                    }
                })
                .then(results => {
                    if (vCompany.companyId != undefined) {
                        let qry = `SELECT e.name as employeeName, e.employeeId, w.name as departmentName
                                     FROM employees e 
                                          INNER JOIN workDepartments w ON (e.workDepartmentId = w.workDepartmentId)
                                    WHERE e.companyId = ${sCompanyId} ORDER BY employeeName`;
                         return pool.query(qry);
                    }
                 })
                 .then(results => {

                    if (vCompany.companyId == undefined) {
                        res.status(404).send("No Record Found");
                    } else {

                        results.forEach(element => {
                            vEmployees.push({ employeeName: element.employeeName,
                                              employeeId  : element.employeeId,
                                              departmentName : element.departmentName
                                            });                        
                        });
    
                        vResult = {
                             companyId: vCompany.companyId,
                             userLogin: vCompany.userLogin,
                             companyName: vCompany.companyName,
                             accountResponsible: vCompany.accountResponsible,
                             contactEmail: vCompany.contactEmail,
                             phoneNumber: vCompany.phoneNumber,
                             address: vCompany.address,
                             cityName: vCompany.cityName,
                             provinceName: vCompany.provinceName,
                             provinceCode: vCompany.provinceCode,
                             postalCode: vCompany.postalCode,
                             imageFile: vCompany.imageFile,
                             employees: vEmployees
                        };
    
                        res.status(200).send(vResult);
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

    companySearch(req);

};


