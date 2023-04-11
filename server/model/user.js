const bcrypt = require("bcrypt");

const { insert, retrieve, checkKeyExist } = require("./db");

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

const checkUserExist = async (usrData) => {
  try {
    const { username } = usrData;
    const tblName = "tbl_user_login_data";
    const field = "username";
    const value = await checkKeyExist(tblName, field, username);
    if (value?.exist) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
const checkPass = async (usrData) => {
  try {
    const { username, password } = usrData;
    const tblName = "tbl_user_login_data";
    const fields = ["username", "passwordHash", "passwordSalt"];
    const dbData = await retrieve(tblName, fields, username);
    const usrPassHash = await bcrypt.hash(password, dbData.passwordHash);
    if (dbData.passwordHash === usrPassHash) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser,
  checkPass,
  checkUserExist,
};
