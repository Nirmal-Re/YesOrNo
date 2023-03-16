const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TempPass123",
  database: "YesNo",
});

connection.query(`show tables`, (err, results, fields) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
});
