import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposSolicitudes = async () => {
  const url = API_URL_BACK_END.replace("#", "tiposSolicitudes");
  try {
    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposSolicitudes es: ", response);
    const promises = response.data.map((tipoSolicitud) => {
      return {
        value: tipoSolicitud.id_tipo_solicitud,
        label: tipoSolicitud.tipo_solicitud,
      };
    });
    console.log("Promises de getAllTiposSolicitudes son: ", promises);
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
