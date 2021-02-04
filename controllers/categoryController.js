const { savyDb, savyPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns a list of all Categories
// ----------------------------------------------------------
exports.getCategories = (req, res) => {
    let qry = `SELECT * from categories c
                  ORDER BY c.name `;
  
    savyPoolDb.then(pool =>{
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
