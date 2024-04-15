import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllBajasLaboralesEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

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

export const saveBajaLaboralEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

  try {
    const formData = {};

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

export const getBajaLaboralEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");
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

export const updateBajaLaboralEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

  try {
    const formData = {};

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

export const deleteBajaLaboralEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");
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
