import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { blockchainServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllTransaccionesVacacionesAutorizadas = async () => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");

  try {
    const response = await axios.get(url + "getAll");

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: blockchainServerDownErrorMessageContent,
      status: error.response.status,
    };
  }
};

export const saveTransaccionVacacionAutorizada = async (data) => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");

  try {
    const formData = {
      id_vacacion_empleado: data.id_vacacion_empleado,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      dias_disponibles: parseInt(data.dias_disponibles),
      dias_pendientes: parseInt(data.dias_pendientes),
      dias_solicitados: parseInt(data.dias_solicitados),
      dias_disfrutados: parseInt(data.dias_disfrutados),
      observacion: data.observacion,
      dni: data.dni,
      tipo_estado: data.tipo_estado,
    };

    const response = await axios.post(url + "save", formData);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const checkVacacionesAutorizadas = async () => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");

  try {
    const response = await axios.get(url + "checkVacacionesAutorizadas");

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: blockchainServerDownErrorMessageContent,
      status: error.response.status,
    };
  }
};
