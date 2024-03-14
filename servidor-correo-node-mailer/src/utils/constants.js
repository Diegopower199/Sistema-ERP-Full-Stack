require("dotenv").config();

const TRANSPORTER_USER = process.env.TRANSPORTER_USER;

const TRANSPORTER_PASSWORD = process.env.TRANSPORTER_PASSWORD;

const PORT_EMAIL_SERVER = process.env.PORT_EMAIL_SERVER;

const API_URL_FRONT_END = `http://${process.env.HOST_FRONT_END}:${process.env.PORT_FRONT_END}`;

module.exports = {
  TRANSPORTER_USER,
  TRANSPORTER_PASSWORD,
  PORT_EMAIL_SERVER,
  API_URL_FRONT_END,
};
