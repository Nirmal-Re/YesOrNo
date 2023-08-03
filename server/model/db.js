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

const executeSQLQuery = async (query) => {
  await dbConnect(DB);
  console.log(query);
  const data = await con.query(query);
  return data[0];
};

const equalTo = (identifier) => {
  const returnValues = [];
  Object.entries(identifier).forEach((fv) => {
    val = `${fv[0]} = '${fv[1]}'`;
    returnValues.push(val);
  });
  return returnValues;
};

const getQueryConstructor = (tblName, fields, identifier, type) => {
  const get = fields.join(", ");
  const conditions = equalTo(identifier);
  const query = `SELECT ${get} FROM ${tblName} WHERE ${conditions.join(
    ` ${type} `
  )};`;
  return query;
};

const getRowData = async (tblName, fileds, identifier, type) => {
  const query = getQueryConstructor(tblName, fileds, identifier, type);
  const data = await executeSQLQuery(query);
  return data[0];
};

const checkKeyValueExist = async (tblName, identifier) => {
  try {
    await dbConnect(DB);
    const conditions = equalTo(identifier);
    const qData = await con.query(
      `SELECT 1 AS exist FROM ${tblName} WHERE ${conditions.join(" OR ")}`
    );
    return qData[0][0];
  } catch (e) {
    console.log(e);
  }
};

const update = async (tblName, toSet, condition) => {
  try {
    await dbConnect(DB);

    const set = equalTo(toSet);
    const cond = equalTo(condition);
    const qry = `UPDATE ${tblName} SET ${set.join(",")} WHERE ${cond.join(
      " AND "
    )}`;
    console.log(qry);
    const result = await con.query(qry);
    console.log(
      "USER could or couldn't have been confirmed. The end on the update() function was reached"
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  insert,
  checkKeyValueExist,
  update,
  getRowData,
  executeSQLQuery,
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
