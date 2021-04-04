const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");


// ----------------------------------------------------------
// Returns the user profile data
// ----------------------------------------------------------
exports.getUser = (req, res) => {

    let userSearch = async (req) => {

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }

        // set TODAY as String
        let d  = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let sToday = `${ye}-${mo}-${da}`;

        // get last 7 days
        d.setDate(d.getDate() - 7);
        ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let s7days = `${ye}-${mo}-${da}`;

        let qry = `SELECT u.userId, l.userLogin, l.name as userName, l.imageFile as imageFile, u.employeeId,
                          c.companyId, lc.name as companyName, srv.surveyId, srv.surveyName, srv.programId,
                          IFNULL(lw.qtd,0) AS weekWorkout
                     FROM users u
                          INNER JOIN login l ON (u.userId = l.loginId)
                          INNER JOIN employees e ON (u.companyId = e.companyId AND u.employeeId = e.employeeId)
                          INNER JOIN companies c ON (u.companyId = c.companyId)
                          INNER JOIN login lc ON (c.companyId = lc.loginId)
                          LEFT JOIN ( SELECT userId, count(*) as qtd
                                        FROM activityLog l
                                       WHERE userId = ${sUserId}
                                         AND DATE_FORMAT(l.logdate, '%Y-%m-%d') BETWEEN "${s7days}" AND "${sToday}"
                                       GROUP BY userId ) lw ON (u.userId = lw.userId)  
                          LEFT JOIN (  SELECT DISTINCT exp.userId, exp.surveyId, exp.surveyName, exp.programId
                                         FROM ( SELECT u.userId,
                                                       s.surveyId, s.name as surveyName,               
                                                       gb.groupbaseId as programId, 
                                                       p.playlistId, 
                                                       count(*) as qtdLessons
                                                  FROM companyPrograms cp
                                                       INNER JOIN groupBase gb on (cp.groupBaseId = gb.groupBaseId)
                                                       INNER JOIN groupBasePlaylists gp ON (gb.groupBaseId = gp.groupBaseId)
                                                       INNER JOIN playlists p ON (gp.playlistId = p.playlistId)
                                                       INNER JOIN playlistLessons pl ON (p.playlistId = pl.playlistId)
                                                       INNER JOIN lessons l ON (pl.lessonId = l.lessonId)
                                                       INNER JOIN employees e ON (cp.companyId = e.companyId)
                                                       INNER JOIN users u ON (e.companyId = u.companyId AND e.employeeId = u.employeeId)
                                                       INNER JOIN workDepartments w ON (e.workDepartmentId = w.workDepartmentId)
                                                       INNER JOIN companyProgramXworkDepartment pw ON (pw.groupBaseId = gb.groupBaseId AND pw.workDepartmentId = e.workDepartmentId)
                                                       LEFT  JOIN surveys s ON (cp.surveyId = s.surveyId)
                                                 WHERE u.userId = ${sUserId} 
                                                 GROUP BY u.userId, s.surveyId, s.name, gb.groupbaseId, p.playlistId
                                              ) exp
                                              INNER JOIN ( SELECT log.userId, log.playlistId, count(*) as qtdLessons
                                                             FROM ( SELECT distinct a.userId, a.playlistId, lessonId
                                                                      FROM activityLog a
                                                                     WHERE a.userId = ${sUserId}  ) log
                                                            GROUP BY log.userId, log.playlistId
                                                          ) comp ON (exp.userId = comp.userId AND exp.playlistId = comp.playlistId AND comp.qtdLessons >= exp.qtdLessons) 
                                        WHERE NOT EXISTS ( SELECT 1
                                                             FROM surveyResponses r
                                                            WHERE r.surveyId = exp.surveyId
                                                              AND r.programId = exp.programId
                                                              AND r.userId = exp.userId )
                                    ) srv ON (u.userId = srv.userId)
                    WHERE u.userId = ${sUserId} `;


        pivotPoolDb.then(pool => {
            pool.query(qry)
                .then(results => {
                    if (results.length == 0) {
                        res.status(404).send("No Record Found");
                    } else {

                        let oUser = {};
                        let vSurveys = [];

                        // Creates array of all the questions for the survey
                        results.forEach(element => {
                            if (element.surveyId != undefined && element.surveyId > 0) {
                                vSurveys.push({
                                    surveyId: element.surveyId,
                                    programId: element.programId,
                                    surveyName: element.surveyName
                                })
                            }
                        });

                        oUser = {
                            userId:      results[0].userId,
                            userLogin:   results[0].userLogin,
                            userName:    results[0].userName,
                            imageFile:   results[0].imageFile,
                            employeeId:  results[0].employeeId,
                            companyId:   results[0].companyId,
                            companyName: results[0].companyName,
                            weekWorkout: results[0].weekWorkout,
                            surveys: vSurveys
                        };

                        res.status(200).send(oUser);
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



// ----------------------------------------------------------
// Returns the user profile data
// ----------------------------------------------------------
exports.getDashboard = (req, res) => {

    let userDashboard = async (req) => {

        let totalWork = 10;

        // set TODAY as String
        let d = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let sToday = `${ye}-${mo}-${da}`;

        let sUserId = pivotDb.escape(req.query.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
        }

        let sInitialDate = pivotDb.escape(req.query.initialDate).replace(/['']+/g, '');
        if (sInitialDate == "" || sInitialDate.toLowerCase() == "null") {
            sInitialDate = sToday;
        }
        let sFinalDate = pivotDb.escape(req.query.finalDate).replace(/['']+/g, '');
        if (sFinalDate == "" || sFinalDate.toLowerCase() == "null") {
            sFinalDate = sToday;
        }

        // get last 7 days
        d.setDate(d.getDate() - 7);
        ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let s7days = `${ye}-${mo}-${da}`;

        let qryStreak = `SELECT MAX(logDate) as lastWorkout,
                               DATEDIFF(CURDATE(), MAX(logDate)) as days
                          FROM activityLog
                         WHERE userId = ${sUserId}`;

        let qry = `select u.userId, lg.userLogin, lg.name as userName, lg.imageFile as imageFile, u.employeeId,
                          c.companyId, lc.name as companyName, w.name AS department, e.employeeId,
                          log2.selected_date, log2.total_work, log2.log_work, log2.percent,
                          IFNULL(lw.qtd,0) AS weekWorkout,
                          IFNULL(ld.qtd,0) AS dayWorkout,                              
                          DATEDIFF(CURDATE(), u.streakStartDate) as streakDay
                     FROM login lg
                          INNER JOIN users u ON (lg.loginId = u.userId)
                          INNER JOIN employees e ON (u.companyId = e.companyId AND u.employeeId = e.employeeId)
                          INNER JOIN companies c ON (u.companyId = c.companyId)
                          INNER JOIN login lc ON (c.companyId = lc.loginId)
                          INNER JOIN workDepartments w ON (e.workDepartmentId = w.workDepartmentId)  
                          LEFT JOIN ( SELECT userId, count(*) as qtd
                                        FROM activityLog l
                                       WHERE userId = ${sUserId}
                                         AND DATE_FORMAT(l.logdate, '%Y-%m-%d') BETWEEN "${s7days}" AND "${sToday}"
                                       GROUP BY userId ) lw ON (u.userId = lw.userId)   
                          LEFT JOIN ( SELECT userId, count(*) as qtd
                                       FROM activityLog l
                                      WHERE userId = 3
                                        AND DATE_FORMAT(l.logdate, '%Y-%m-%d') = DATE_FORMAT(CURDATE(), '%Y-%m-%d')
                                      GROUP BY userId ) ld ON (u.userId = lw.userId)                                                          
                          LEFT JOIN ( SELECT selected_date,
                                             ${totalWork} AS total_work,
                                             log.qtd AS log_work,
                                             (log.qtd / ${totalWork}) * 100 AS percent
                                        FROM ( select DATE_FORMAT(selected_date, '%Y-%m-%d') AS selected_date from
                                                        (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date from
                                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
                                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
                                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
                                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
                                                        (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
                                                where selected_date BETWEEN "${sInitialDate}" AND "${sFinalDate}" ) days
                                            LEFT JOIN ( SELECT userId, DATE_FORMAT(l.logdate, '%Y-%m-%d') as logDate, count(*) as qtd
                                                            FROM activityLog l
                                                            WHERE userId = ${sUserId}
                                                            AND DATE_FORMAT(l.logdate, '%Y-%m-%d') BETWEEN "${sInitialDate}" AND "${sFinalDate}"
                                                            GROUP BY userId, DATE_FORMAT(l.logdate, '%Y-%m-%d') ) log ON (days.selected_date = log.logDate)
                                            ) log2 on (1=1)
                 WHERE lg.loginId = ${sUserId}  
                 ORDER BY selected_date `;

        let updStreak = ``;                    
        pivotPoolDb.then(pool => {
            pool.query(qryStreak)
                .then(results => {
                   if (results[0].days > 1) {
                       updStreak = `UPDATE users SET streakStartDate = CURDATE() WHERE userId = ${sUserId}`;
                   }
                   if (updStreak != ``) {
                      return pool.query(updStreak);
                   } else {
                      return results;
                   }
                })
                .then(results => {
                   return pool.query(qry);
                })
                .then(results => {
                    if (results.length == 0) {
                        res.status(404).send("No Record Found");
                    } else {
                        let vWeekDays = [];
                        let workInDay = 0;
                        results.forEach(result => {
                            vWeekDays.push({
                                day: result.selected_date,
                                total: result.total_work,
                                logged: result.log_work,
                                percent: result.percent
                            })
                            if (result.selected_date == sToday) {
                                workInDay = result.log_work;
                            }
                        });

                        let myResult = {
                            userId: results[0].userId,
                            userName: results[0].userName,
                            imageFile: results[0].imageFile,
                            employeeId: results[0].employeeId,
                            companyId: results[0].companyId,
                            companyName: results[0].companyName,
                            department: results[0].department,
                            workInDay: results[0].dayWorkout,
                            streakDay: results[0].streakDay,
                            weekWorkout: results[0].weekWorkout,
                            daysResult: vWeekDays
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

    userDashboard(req);
};














// ----------------------------------------------------------
// Updates the user profile data
// ----------------------------------------------------------
exports.updUser = (req, res) => {

    let userUpdate = async (req) => {

        const valError = validationResult(req).array();
        //console.log(valError);

        if (valError.length > 0) {
            res.status(500).send(valError);
        } else {

            let sMessageInfo = '';
            let objUser = req.body;
            console.log(objUser);

            let sUserId = pivotDb.escape(objUser.userId).replace(/['']+/g, '');
            if (sUserId == "" || sUserId.toLowerCase() == "null") {
                sUserId = '-1';
                sMessageInfo = 'Valid userId not found'
            }

            let sSetUser = 'SET ';
            if (sMessageInfo == '') {
                if (objUser.userName != '' && objUser.userName != undefined) {
                    sSetUser = sSetUser + ` name = "${objUser.userName}", `;
                }
                if (objUser.imageFile == null || objUser.imageFile == '') {
                    sSetUser = sSetUser + ` imageFile = '', `;
                } else {
                    if (objUser.imageFile != '' && objUser.imageFile != undefined) {
                        sSetUser = sSetUser + ` imageFile = "${objUser.imageFile}", `;
                    }
                }

                let ultComma = sSetUser.lastIndexOf(",");
                if (ultComma > 0) {
                    sSetUser = sSetUser.substring(0, ultComma);
                }
            }

            if (sUserId != '-1' && sSetUser == 'SET ') {
                sMessageInfo = 'No content to update';
            }
            if (sMessageInfo != '') {
                let myResult = {
                    messageInfo: sMessageInfo,
                    object: objUser
                };
                res.status(500).send(myResult);
            } else {

                let resUsers = '';
                let qry = `UPDATE login ${sSetUser} 
                            WHERE loginId = ${sUserId}  `;

                pivotPoolDb.then(pool => {
                    pool.query(qry)
                        .then(results => {
                            if (results.affectedRows == 0) {
                                sMessageInfo = 'No Records found'
                            } else {
                                sMessageInfo = 'Record Updated'
                            }

                            let myResult = {
                                messageInfo: sMessageInfo,
                                sqlUser: resUsers
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

    userUpdate(req);
}

