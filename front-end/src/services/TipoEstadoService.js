import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposEstados = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "tiposEstados");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposEstados es: ", response);
    const promises = response.data.map((tipoEstado) => {
      return {
        value: tipoEstado.id_tipo_estado,
        label: tipoEstado.tipo_estado,
      };
    });
    console.log("Promises de getAllTiposEstados son: ", promises);
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
