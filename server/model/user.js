const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY, USER_EMAIL } = require("../constants");

const { insert, retrieve, checkKeyExist, update } = require("./db");
const { send } = require("../email/email.js");

const createUser = async (usrData) => {
  try {
    console.log(usrData);
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(usrData.password, passwordSalt);
    usrData.passwordSalt = passwordSalt;
    usrData.passwordHash = passwordHash;
    usrData.hashAlgorithm = "bcrypt";
    const tblName = "tbl_user_login_data"; //todo add in constant file
    delete usrData.password;
    const token = jwt.sign({ username: usrData.username }, TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);

    const text = `http://localhost:4000/confirm/${token}`;

    console.log(usrData.email);
    const options = {
      from: USER_EMAIL,
      to: usrData.email,
      subject: "confirmation",
      text,
    };
    send(options);

    insert(tblName, usrData);
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

const confirmUser = async (username) => {
  try {
    const tblName = "tbl_user_login_data";
    const field = "confirmEmail";
    const value = true;
    const condition = `username = '${username}'`;
    update(tblName, field, value, condition);
  } catch (e) {}
};

module.exports = {
  createUser,
  checkPass,
  checkUserExist,
  confirmUser,
};
