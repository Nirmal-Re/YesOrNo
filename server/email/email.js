const nodemailer = require("nodemailer");

const { TRANSPORTER_VALUES } = require("../constants");

const transporter = nodemailer.createTransport({
  ...TRANSPORTER_VALUES,
});

const send = (options) => {
  transporter.sendMail(options, (err, res) => {
    console.log("Email Sent");
    if (err) {
      console.log("Error", err);
    } else {
      console.log(res);
    }
  });
};

module.exports = {
  send,
};
