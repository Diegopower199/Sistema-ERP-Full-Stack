import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTransaccionesVacacionesAutorizadas = async () => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");

  try {
    const response = await axios.get(url + "getAll");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const saveTransaccionVacacionAutorizada = async (data) => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");
  console.log("FORM blockchain Vacaciones Autorizadas: ", data);
  try {
    let formData = {};
    formData["id_vacacion_empleado"] = parseInt(data.id_vacacion_empleado);
    formData["fecha_inicio"] = data.fecha_inicio;
    formData["fecha_fin"] = data.fecha_fin;
    formData["dias_disponibles"] = parseInt(data.dias_disponibles);
    formData["dias_pendientes"] = parseInt(data.dias_pendientes);
    formData["dias_solicitados"] = parseInt(data.dias_solicitados);
    formData["dias_disfrutados"] = parseInt(data.dias_disfrutados);
    formData["observacion"] = data.observacion;
    formData["dni"] = data.dni;
    formData["tipo_estado"] = data.tipo_estado;
    
    const response = await axios.post(url + "save", formData);
    console.log("Response: ", response);
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