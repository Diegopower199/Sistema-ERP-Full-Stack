import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllVacacionesEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const saveVacacionEmpleado = async (data) => {
  // Los dias los calculo en el back
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");
  console.log("FORM VACACIONES EMPLEADOS: ", data);
  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: data.observacion,
      persona: {
        dni: data.dni,
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const getVacacionEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const updateVacacionEmpleado = async (id, data) => {
  // Los dias los calculo en el back, si los rechazo se devuelven los datos anteriores
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");
  console.log(`FORM VACACIONES EMPLEADOS CON id ${id}: `, data);
  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: data.observacion,
      persona: {
        dni: data.dni,
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const deleteVacacionEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};
