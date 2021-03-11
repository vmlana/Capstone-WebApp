const { pivotDb, pivotPoolDb } = require("../connection.js");
const { validationResult } = require("express-validator");

// ----------------------------------------------------------
// Returns a the survey questions
// ----------------------------------------------------------
exports.getSurvey = (req, res) => {

    let sSurveyId   = pivotDb.escape(req.query.surveyId).replace(/['']+/g, '');
    if (sSurveyId != "" && sSurveyId.toLowerCase() != "null") {
        sSurveyId = "-1";
    }

    let qry = `SELECT s.surveyId, s.name as surveyName,
                      q.questionId, q.number AS questionNumber, q.question AS questionDescription, 
                      CASE WHEN q.questionType = "R" THEN "Ratio"
                           WHEN q.questionType = "E" THEN "Edit" ELSE "Other" END AS questionType,
                      o.optionId, o.option AS optionDescription, o.optionValue
                 FROM surveys s
                      INNER JOIN questions q ON (q.surveyId = s.surveyId)
                      LEFT  JOIN questionOptions o ON (q.questionId = o.questionId)
                WHERE s.surveyId = 1 
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



