const { pivotDb, pivotPoolDb } = require("../connection.js");

// ----------------------------------------------------------
// Returns a list of all Cities
// ----------------------------------------------------------
exports.getCities = (req, res) => {
    let qry = `SELECT c.cityId, c.name as cityName, p.provinceId as provinceCode,
                      CONCAT(c.name,' - ',p.provinceId) as cityAndProvince
                 FROM cities c 
                      INNER JOIN provinces p ON (c.provinceId = p.provinceId)
                ORDER BY cityName    `;
  
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

