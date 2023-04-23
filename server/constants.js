const DB = {
  host: "localhost",
  user: "root",
  password: "TempPass123",
  database: "Yesno",
};
const TOKEN_SECRET_KEY =
  "5f6e3a44374062526915202a18476a4d899c5fd01c95bd2ab14adaabc9b1d528d45a280b919947420a6b23aa950524d9eea1df0c9131776473c8274790e03958";
const USER_EMAIL = "bhannn@outlook.com";
const USER_PASS = "123456789@!";

const TRANSPORTER_VALUES = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "19418d436a4d3d",
    pass: "73be2a30ea8caa",
  },
};

module.exports = {
  DB,
  TOKEN_SECRET_KEY,
  USER_EMAIL,
  USER_PASS,
  TRANSPORTER_VALUES,
};
