import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllTiposSolicitudes = async () => {
  const url = API_URL_BACK_END.replace("#", "tiposSolicitudes");
  try {
    const response = await axios.get(url + "getAll");

    if (response.status === 204) {
      return {
        data: [],
        status: response.status,
      };
    }

    const promises = response.data.map((tipoSolicitud) => {
      return {
        value: tipoSolicitud.id_tipo_solicitud,
        label: tipoSolicitud.tipo_solicitud,
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
        errorMessage:backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};
