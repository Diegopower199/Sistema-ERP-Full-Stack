import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";
import axios from "axios";

export const getAllTiposAyudas = async () => {
  const url = API_URL_BACK_END.replace("#", "tiposAyudas");

  try {
    const response = await axios.get(url + "getAll");

    if (response.status === 204) {
      return {
        data: [],
        status: response.status,
      };
    }

    const promises = response.data.map((tipoAyuda) => {
      return {
        value: tipoAyuda.id_tipo_ayuda,
        label: tipoAyuda.tipo_ayuda,
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
