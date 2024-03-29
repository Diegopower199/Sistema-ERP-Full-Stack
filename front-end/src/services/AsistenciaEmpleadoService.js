import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllAsistenciaEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
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

export const startOfWorkdayAsistenciaEmpleado = async (data) => {
  // Inicio de la jornada laboral
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
  console.log("FORM PERSONA: ", data);
  try {
    const formData = {};

    const response = await axios.post(url + "startOfWorkday", formData);
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

export const endOfWorkdayAsistenciaEmpleado = async (data) => {
  // Fin de la jornada laboral (NO ESTE BIEN, NO SÉ IDENTIFICARLO)
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
  console.log("FORM ASISTENCIA EMPLEADO: ", data);
  try {
    const formData = {};

    const response = await axios.post(url + "endOfWorkday", formData);
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

export const getAsistenciaEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
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

export const updateAsistenciaEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
  console.log(`FORM ASISTENCIA EMPLEADO CON id ${id}: `, data);
  try {
    const formData = {};

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

export const deleteAsistenciaEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");
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
