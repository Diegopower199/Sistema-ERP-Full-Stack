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

export const saveSolicitudEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  console.log("FORM SOLICITUD EMPLEADO: ", data);
  try {
    const formData = {
      fecha_solicitud: data.fecha_solicitud,
      observacion: data.observacion,
      persona: {
        dni: data.dni,
      },
      tipo_solicitud: {
        id_tipo_solicitud: parseInt(data.id_tipo_solicitud),
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

export const getSolicitudEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
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

export const updateSolicitudEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    const formData = {
      fecha_solicitud: data.fecha_solicitud,
      observacion: data.observacion,
      persona: {
        dni: data.dni,
      },
      tipo_solicitud: {
        id_tipo_solicitud: parseInt(data.id_tipo_solicitud),
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

export const deleteSolicitudEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "solicitudesEmpleados");
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
