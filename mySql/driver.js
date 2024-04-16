var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP doesnt give a password
  database: "gonzalos-movies",
});

connection.connect();

// wrap connection.query in a promise
function asyncMySQL(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = asyncMySQL;

// There is no need to end the connection
// connection.end();
