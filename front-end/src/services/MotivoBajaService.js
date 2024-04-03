import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllMotivosBajas = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "motivosBajas");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllMotivosBajas es: ", response);
    const promises = response.data.map((motivoBaja) => {
      return {
        value: motivoBaja.id_motivo_baja,
        label: motivoBaja.motivo_baja,
      };
    });
    console.log("Promises de getAllMotivosBajas son: ", promises);
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
