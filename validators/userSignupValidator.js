const { pivotPoolDb } = require("../connection.js");

const isExistOnEmployeeList = async (req) => {
    let qry = `
        select
            e.companyId,
            l.name,
            e.name,
            e.employeeId
        from
            employees e 
        inner join
            companies c
        on e.companyId = c.companyId
        inner join
            login l
        on e.companyId = l.loginId
        where l.name = '${req.body.companyName}' and e.employeeId = ${req.body.employeeId};
    `;
    return pivotPoolDb.then(async(pool) => {

        return pool.query(qry)
            .then(results => {
                return results;
            })
        })
        .catch(error => {
            console.log(error);
        });
}

const notRegisteredYet = async (req) => {
    let qry = `
        select 
            *
        from
            users u
        inner join
            login l
        on u.companyId = l.loginId
        where
            u.employeeId = ${req.body.employeeId}
        and
            l.name = '${req.body.companyName}';
    `;
    return pivotPoolDb.then(async(pool) => {

        return pool.query(qry)
            .then(results => {
                return results;
                // if (results.length == 0) {
                //     return true;
                // } else {
                //     return false;
                // }
            })
    })
        .catch(error => {
            console.log(error);
        });
}

exports.userSignupValidator = async (req, res, next) =>{
    if(req.body.userType === "user") {

        const responseExist = await isExistOnEmployeeList(req);
        //    console.log(1, responseExist);
        //    console.log(1.5, req.body.companyId);

        const responseNotRegistered = await notRegisteredYet(req);

        // console.log(2, responseNotRegistered);

        if(!req.body.companyName || !req.body.employeeId) {
            return res.status(400).send({
                success: false,
                message: "Missing companyName or(and) employeeId.",
            })
        } 
        else if (responseExist.length === 0) {
            return res.status(403).send({
                success: false,
                message: "The user was not found.",
            })
        }
        else if (responseNotRegistered.length !== 0) {
            return res.status(409).send({
                success: false,
                message: "The user was already registered.",
            })
        } else {
            req.body.companyId = responseExist[0].companyId;
            next();
        }

    } else {
        next();
    }
};

// exports.userSignupValidator = [

//     check("employeeId")
//         .escape()
//         .notEmpty().withMessage("Must have a valid company name")
//         .custom(isExistOnEmployeeList).withMessage("The user was not found on any employee lists")
//         .custom(notRegisteredYet).withMessage("The user is already registered."),

// ];

