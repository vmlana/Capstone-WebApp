const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");

// ----------------------------------------------------------
// Returns a the survey questions
// ----------------------------------------------------------
exports.getSurvey = (req, res) => {

    let sSurveyId = pivotDb.escape(req.query.surveyId).replace(/['']+/g, '');
    if (sSurveyId == "" || sSurveyId.toLowerCase() == "null") {
        sSurveyId = '-1';
    }

    let qry = `SELECT s.surveyId, s.name as surveyName,
                      q.questionId, q.number AS questionNumber, q.question AS questionDescription, 
                      CASE WHEN q.questionType = "R" THEN "Ratio"
                           WHEN q.questionType = "E" THEN "Edit" ELSE "Other" END AS questionType,
                      o.optionId, o.optionDescription AS optionDescription, o.optionValue
                 FROM surveys s
                      INNER JOIN questions q ON (q.surveyId = s.surveyId)
                      LEFT  JOIN questionOptions o ON (q.questionId = o.questionId)
                WHERE s.surveyId = ${sSurveyId} 
                ORDER BY surveyName, surveyId, questionNumber, questionId, optionValue, optionId `;

    pivotPoolDb.then(pool => {
        pool.query(qry)
            .then(results => {
                if (results.length == 0) {
                    res.status(404).send("No Record Found");
                } else {

                    let oSurvey = {};
                    let vQuestions = [];
                    let i = 0;

                    while (i < results.length) {
                        let vOptions = [];
                        let iQuestionBase = i;
                        let iQuestionId = results[i].questionId;

                        // Creates array of all the questions for the survey
                        while (i < results.length && iQuestionId == results[i].questionId) {
                            if (results[i].optionId > 0 && results[i].optionId != undefined) {
                                vOptions.push({
                                    optionId: results[i].optionId,
                                    optionDescription: results[i].optionDescription,
                                    optionValue: results[i].optionValue
                                });
                            }
                            i++;
                        }

                        vQuestions.push({
                            questionId: results[iQuestionBase].questionId,
                            questionNumber: results[iQuestionBase].questionNumber,
                            questionDescription: results[iQuestionBase].questionDescription,
                            questionType: results[iQuestionBase].questionType,
                            options: vOptions
                        });

                    };

                    oSurvey = {
                        surveyId: results[0].surveyId,
                        surveyName: results[0].surveyName,
                        questions: vQuestions
                    };

                    res.status(200).send(oSurvey);
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
// Save Survey Results for users
// ----------------------------------------------------------
exports.saveSurvey = (req, res) => {

    let fSaveSurvey = async (req) => {

        let sMessageInfo = '';
        let obj = req.body;

        let sUserId = pivotDb.escape(obj.userId).replace(/['']+/g, '');
        if (sUserId == "" || sUserId.toLowerCase() == "null") {
            sUserId = '-1';
            sMessageInfo = 'Valid userId not found.'
        }

        let sSurveyId = pivotDb.escape(obj.surveyId).replace(/['']+/g, '');
        if (sSurveyId == "" || sSurveyId.toLowerCase() == "null") {
            sMessageInfo += ' Valid surveyId not found.'
            sSurveyId = '-1';
        }

        let sProgramId = pivotDb.escape(obj.programId).replace(/['']+/g, '');
        if (sProgramId == "" || sProgramId.toLowerCase() == "null") {
            sProgramId = 'null';
        }

        if (sMessageInfo == '') {

            // Set current date time
            var currentdate = new Date();
            let sDate = zeroPad(currentdate.getFullYear(), 4) + '-' +
                zeroPad((currentdate.getMonth() + 1), 2) + '-' +
                zeroPad(currentdate.getDate(), 2) + ' ' +
                currentdate.getHours() + ":" +
                currentdate.getMinutes() + ":" +
                currentdate.getSeconds();


            obj.answers.forEach(answer => {

                pivotPoolDb.then(pool => {

                    qry = `INSERT INTO surveyResponses (userId, surveyId, programId, questionId, surveyDate, answer)
                                ( SELECT ${sUserId} AS userId,
                                         ${sSurveyId} AS surveyId,
                                         ${sProgramId} AS programId,
                                         ${answer.questionId} AS questionId,
                                         "${sDate}" AS surveyDate,
                                         CASE WHEN qo.optionId IS NOT NULL THEN qo.optionDescription
                                              ELSE "${answer.answerValue}" END AS answer
                                    FROM questions q
                                         LEFT JOIN questionOptions qo ON (qo.questionId = q.questionId)
                                   WHERE q.questionId = ${answer.questionId}
                                     AND (qo.optionId IS NULL OR (qo.optionId IS NOT NULL AND qo.optionValue = "${answer.answerValue}"))  )`;

                    pool.query(qry)
                        .then(results => {
                            //console.log(results)
                            return results;
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
            });

            res.status(200).send('Survey Registered');

        } else {
            console.log(error);
            res.status(500).send(sMessageInfo);
        }

    };

    fSaveSurvey(req);
}


const zeroPad = (num, places) => String(num).padStart(places, '0');



