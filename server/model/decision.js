const { insert, getRowData, executeSQLQuery } = require("./db.js");
const { getUserID } = require("./user.js");

const getDecisionID = async (name) => {
  const { ID } = await getRowData("tbl_decision_type", ["ID"], { name }, "OR");
  return ID;
};

const makeDecision = async (data) => {
  const { username, decision } = data;
  const user_id = await getUserID({ username });
  const decision_type = await getDecisionID(decision);
  insert("tbl_decisions_data", { user_id, decision_type });
};

const getDecisions = async (data) => {
  const { username } = data;
  const user_id = await getUserID({ username });
  const query = `SELECT decision_type FROM tbl_decisions_data WHERE user_id = ${user_id};`;
  const returnData = await executeSQLQuery(query);
  console.log(returnData);
};
module.exports = {
  makeDecision,
  getDecisions,
};
