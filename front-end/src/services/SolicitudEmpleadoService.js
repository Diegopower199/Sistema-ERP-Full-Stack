import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllSolicitudesEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");

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

export const saveSolicitudEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  console.log("FORM SOLICITUD EMPLEADO: ", data);
  try {
    let formData = {};
    formData["fecha_solicitud"] = data.fecha_solicitud;
    formData["observacion"] = data.observacion;
    formData["persona"] = {
      dni: data.dni,
    };
    formData["tipo_solicitud"] = {
      id_tipo_solicitud: parseInt(data.id_tipo_solicitud),
    };
    formData["tipo_estado"] = {
      id_tipo_estado: parseInt(data.id_tipo_estado),
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

export const getSolicitudEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  try {
    const response = await axios.get(url + "getById/" + id);
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

export const updateSolicitudEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    let formData = {};
    formData["fecha_solicitud"] = data.fecha_solicitud;
    formData["observacion"] = data.observacion;
    formData["persona"] = {
      dni: data.dni,
    };
    formData["tipo_solicitud"] = {
      id_tipo_solicitud: parseInt(data.id_tipo_solicitud),
    };
    formData["tipo_estado"] = {
      id_tipo_estado: parseInt(data.id_tipo_estado),
    };
    console.log("Form hecho: ", formData, "\nID: ", id);

    const response = await axios.put(url + "update/" + id, formData);
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

export const deleteSolicitudEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  try {
    const response = await axios.delete(url + "delete/" + id);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data,
      status: error.response.status,
    };
  }
};
