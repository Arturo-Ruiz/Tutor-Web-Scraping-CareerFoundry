const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailUsername = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;

const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO;

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  auth: {
    user: mailUsername,
    pass: mailPassword,
  },
});

function sendEmail(subject, text) {
  const mailOptions = {
    from: mailFrom,
    to: mailTo,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Send: " + info.response);
    }
  });
}

module.exports = {
  transporter,
  sendEmail,
};
