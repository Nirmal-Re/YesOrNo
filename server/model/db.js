const mysql = require("mysql2/promise");

const { DB } = require("../constants");

let con;
const dbConnect = async (dbConData) => {
  con = await mysql.createConnection({ ...dbConData });
};

const insert = async (tblName, data) => {
  try {
    await dbConnect(DB);
    con.query(`INSERT INTO ${tblName} SET ?`, data);
  } catch (e) {
    console.log(e);
  }
};

const retrieve = async (tblName, fields, username) => {
  try {
    await dbConnect(DB);
    const p = fields.join(", ");

    const data = await con.query(
      `SELECT ${p} FROM ${tblName} WHERE username='${username}'`
    );
    console.log(`SELECT ${p} FROM ${tblName} WHERE username='${username}'`);
    console.log(data[0][0]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  insert,
  retrieve,
};

// const dummy_userData = {
//   username: "NBS1",
//   email: "NB@yahoo.com",
//   first_name: "walter",
//   last_name: "white",
// };

// insert("tbl_user_login_data", dummy_userData);

// connection.query(
//   `INSERT INTO tbl_user_login_data SET ?`,
//   user_data,
//   (err, result, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   }
// );
