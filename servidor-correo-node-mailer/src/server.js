const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const {
  TRANSPORTER_USER,
  API_URL_FRONT_END,
  TRANSPORTER_PASSWORD,
  PORT_EMAIL_SERVER,
} = require("./utils/constants");

const app = express();

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar CORS
app.use(
  cors({
    origin: API_URL_FRONT_END,
  })
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: TRANSPORTER_USER,
    pass: TRANSPORTER_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log("Listo para enviar correo electronico"));

app.post("/sendEmail", async (req, res) => {
  try {
    const { body } = req;

    const content = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Código de Verificación</h2>
        <p>Estimado Usuario,</p>
        <p>Aquí tienes tu código de verificación:</p>
        <h1 style="font-size: 2em; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${body.verificationCode}</h1>
        <p>Por favor, utiliza este código para completar tu proceso de verificación.</p>
        <p>Gracias,<br>Equipo de Soporte</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: "TechSoluciones Informáticas S.L <soporte@techsoluciones.com>",
      to: body.to,
      subject: "Código de Verificación",
      html: content,
    });

    if (!info.error) {
      res.status(200).send("Mensaje enviado");
    } else {
      res.status(500).send(info.error);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(parseInt(PORT_EMAIL_SERVER), () =>
  console.log(`Escuchando desde http://localhost:${PORT_EMAIL_SERVER}`)
);
