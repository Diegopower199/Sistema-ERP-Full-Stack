import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllMotivosBajas = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "motivosBajas");

    const response = await axios.get(url + "getAll");

    if (response.status === 204) {
      return {
        data: [],
        status: response.status,
      };
    }

    const promises = response.data.map((motivoBaja) => {
      return {
        value: motivoBaja.id_motivo_baja,
        label: motivoBaja.motivo_baja,
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
