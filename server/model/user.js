const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET_KEY,
  PASSWORD_SECRET_KEY,
  USER_EMAIL,
} = require("../constants");

const { insert, getRowData, checkKeyValueExist, update } = require("./db");
const { send } = require("../email/email.js");

const hashPassword = async (password) => {
  const passwordSalt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, passwordSalt);
  const hashAlgorithm = "bcrypt";
  return { passwordSalt, passwordHash, hashAlgorithm };
};

const createUser = async (usrData) => {
  try {
    console.log(usrData);
    const { passwordSalt, passwordHash, hashAlgorithm } = await hashPassword(
      usrData.password
    );
    usrData.passwordSalt = passwordSalt;
    usrData.passwordHash = passwordHash;
    usrData.hashAlgorithm = hashAlgorithm;
    const tblName = "tbl_user_login_data"; //todo add in constant file
    delete usrData.password;
    const token = jwt.sign({ username: usrData.username }, TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    const text = `http://localhost:4000/confirm/${token}`;

    console.log(usrData);
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

const getUserID = async (userIdentifier) => {
  try {
    const valueReturned = await getRowData(
      "tbl_user_login_data",
      ["ID"],
      userIdentifier,
      "OR"
    );
    return valueReturned.ID;
  } catch (e) {
    console.log(e);
  }
};

const checkUserExist = async (value) => {
  try {
    const tblName = "tbl_user_login_data";
    const check = await checkKeyValueExist(tblName, {
      username: value,
      email: value,
    });
    if (check?.exist) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
const checkPass = async (userData) => {
  try {
    const { username, password } = userData;
    const tblName = "tbl_user_login_data";
    const fields = ["username", "passwordHash", "passwordSalt"];
    const dbData = await getRowData(
      tblName,
      fields,
      { username, email: username },
      "OR"
    );
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

const updateUserPassword = async (password, email) => {
  const { passwordHash, passwordSalt, hashAlgorithm } = await hashPassword(
    password
  );
  const tblName = "tbl_user_login_data";
  const returnValue = await update(
    tblName,
    { passwordHash, passwordSalt, hashAlgorithm },
    { email }
  );
  return returnValue;
};

const confirmUser = async (username) => {
  try {
    const tblName = "tbl_user_login_data";
    update(tblName, { confirmEmail: 1 }, { username: `${username}` });
  } catch (e) {
    console.log(e);
  }
};

const changePasswordToken = async (email) => {
  const token = jwt.sign({ email }, PASSWORD_SECRET_KEY, {
    expiresIn: "1d",
  });
  console.log(token);

  const text = `http://localhost:3000/changePassword/${token}`; //TODO frontend url
  const options = {
    from: USER_EMAIL,
    to: email,
    subject: "confirmation",
    text,
  };
  send(options);
};
module.exports = {
  createUser,
  checkPass,
  checkUserExist,
  confirmUser,
  changePasswordToken,
  updateUserPassword,
  getUserID,
};
