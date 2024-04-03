import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposAyudas = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "tiposAyudas");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposAyudas es: ", response);
    const promises = response.data.map((tipoAyuda) => {
      return {
        value: tipoAyuda.id_tipo_ayuda,
        label: tipoAyuda.tipo_ayuda,
      };
    });
    console.log("Promises de getAllTiposAyudas son: ", promises);
    return promises;
  } catch (error) {
    if (error.response) {
      return {
        errorMessage: error.response.data.message,
        status: error.response.status,
      };
    } else {
      return {
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};
