import axios from "axios";
import { API_URL_EMAIL } from "@/utils/constants";
import { emailServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const sendEmailNodeMailer = async (data) => {
  const url = API_URL_EMAIL;

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
    return {
      errorMessage: emailServerDownErrorMessageContent,
      status: 500,
    };
  }
};
