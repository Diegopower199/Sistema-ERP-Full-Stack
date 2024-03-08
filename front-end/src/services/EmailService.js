import axios from "axios";
import { API_URL_EMAIL } from "@/utils/constants";

export const sendEmailNodeMailer = async (data) => {
  const url = API_URL_EMAIL;
  console.log("FORM send email: ", data);
  try {
    let formData = {};
    formData["to"] = data.correo_electronico;
    formData["verificationCode"] = data.codigo_verificacion;

    const response = await axios.post(url + "sendEmail", formData);

    console.log("RESPUESTA EMAIL: ", response);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data,
      status: error.response.status,
    };
  }
};
