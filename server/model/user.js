const bcrypt = require("bcrypt");

const { insert, retrieve } = require("./db");

const createUser = async (usrData) => {
  try {
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(usrData.password, passwordSalt);
    usrData.passwordSalt = passwordSalt;
    usrData.passwordHash = passwordHash;
    usrData.hashAlgorithm = "bcrypt";
    const tblName = "tbl_user_login_data"; //todo add in constant file
    delete usrData.password;
    await insert(tblName, usrData);
    console.log("User Created");
  } catch (e) {
    console.log(e);
  }
};

const checkUser = async (usrData) => {
  try {
    const { username } = usrData;
    console.log(username);
    const tblName = "tbl_user_login_data";
    const fields = ["username", "passwordHash", "passwordSalt"];
    retrieve(tblName, fields, username);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser,
  checkUser,
};
