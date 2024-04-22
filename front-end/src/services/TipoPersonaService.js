import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllTiposPersonas = async () => {
  const url = API_URL_BACK_END.replace("#", "tiposPersonas");
  try {
    const response = await axios.get(url + "getAll");

    if (response.status === 204) {
      return {
        data: [],
        status: response.status,
      };
    }

    const promises = response.data.map((tipoPersona) => {
      return {
        value: tipoPersona.id_tipo_persona,
        label: tipoPersona.tipo_persona,
      };
    });

    return {
      data: promises,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      return {
        errorMessage: error.response.data.message,
        status: error.response.status,
      };
    } else {
      return {
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};
