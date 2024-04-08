import axios from "axios";
import { API_URL_EMAIL } from "@/utils/constants";

export const sendEmailNodeMailer = async (data) => {
  const url = API_URL_EMAIL;
  console.log("FORM send email: ", data);
  try {
    const formData = {
      to: data.correo_electronico,
      verificationCode: data.codigo_verificacion,
    };

    const response = await axios.post(url + "sendEmail", formData);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("error email: ", error)
    return {
      errorMessage: (
        <div>
          <h1>¡Error Técnico en Nuestro Servidor de Correo Electrónico!</h1>
          <p>
            Lo sentimos mucho, pero en estos momentos estamos enfrentando
            dificultades técnicas con nuestro servidor de correo electrónico.
            Esto puede causar una interrupción temporal en la entrega y
            recepción de correos electrónicos.
          </p>
          <p>
            Estamos trabajando incansablemente para resolver este problema tan
            pronto como sea posible. Apreciamos enormemente su paciencia y
            comprensión mientras trabajamos en una solución.
          </p>
          <p>
            Por favor, tenga en cuenta que es posible que experimente retrasos
            en la entrega de correos electrónicos durante este tiempo. Le
            pedimos disculpas por cualquier inconveniente que esto pueda causar.
          </p>
          <p>
            Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto
            con nuestro equipo de soporte.
          </p>
          <p>¡Gracias por su comprensión y disculpe las molestias!</p>
        </div>
      ),
      status: 500,
    };
  }
};
