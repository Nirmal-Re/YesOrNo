const mysql = require("mysql2/promise");

const { DB } = require("../constants");

let con;
const dbConnect = async (dbConData) => {
  con = await mysql.createConnection({ ...dbConData });
  return con;
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
    return data[0][0];
  } catch (e) {
    console.log(e);
  }
};

const checkKeyExist = async (tblName, field, key) => {
  try {
    await dbConnect(DB);
    // console.log(`SELECT true AS exist FROM ${tblName} WHERE ${field}='${key}'`);
    const qData = await con.query(
      `SELECT 1 AS exist FROM ${tblName} WHERE ${field}='${key}'`
    );
    return qData[0][0];
  } catch (e) {
    console.log(e);
  }
};

const update = async (tblName, field, value, condition) => {
  try {
    await dbConnect(DB);
    const qry = `UPDATE ${tblName} SET ${field} = ${value} WHERE ${condition}`;
    const result = await con.query(qry);
    console.log(result);
    console.log(
      "USER could or couldn't have been confirmed. The end on the update() function was reached"
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  insert,
  retrieve,
  checkKeyExist,
  update,
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
