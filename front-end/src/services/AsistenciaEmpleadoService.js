import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { asignarNullSiCadenaVacia } from "@/utils/helpers";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllAsistenciaEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const response = await axios.get(url + "getAll");

    return {
      data: response.data,
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

export const saveAsistenciaEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const formData = {
      fecha_asistencia: data.fecha_asistencia,
      hora_entrada: data.hora_entrada,
      hora_salida: data.hora_salida,
      horas_trabajadas_dia: data.horas_trabajadas_dia,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
    };

    const response = await axios.post(url + "save", formData);

    return {
      data: response.data,
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

// Inicio de la jornada laboral, No esta hecho
export const startOfWorkdayAsistenciaEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const formData = {};

    const response = await axios.post(url + "startOfWorkday", formData);

    return {
      data: response.data,
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

// Fin de la jornada laboral, No esta hecho
export const endOfWorkdayAsistenciaEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const formData = {};

    const response = await axios.post(url + "endOfWorkday", formData);

    return {
      data: response.data,
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

export const getAsistenciaEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const response = await axios.get(url + "getById/" + id);

    return {
      data: response.data,
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

export const updateAsistenciaEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const formData = {
      fecha_asistencia: data.fecha_asistencia,
      hora_entrada: data.hora_entrada,
      hora_salida: data.hora_salida,
      horas_trabajadas_dia: data.horas_trabajadas_dia,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
    };

    const response = await axios.put(url + "update/" + id, formData);

    return {
      data: response.data,
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

export const deleteAsistenciaEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "asistenciasEmpleados");

  try {
    const response = await axios.delete(url + "delete/" + id);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      return {
        errorMessage: error.response.data,
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
