const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns a list of all Tags
// ----------------------------------------------------------
exports.getTags = (req, res) => {
    let qry = `SELECT * from tags t
                  ORDER BY t.name `;
  
    pivotPoolDb.then(pool =>{
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

