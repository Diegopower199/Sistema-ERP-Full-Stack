import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllClientes = async () => {
  const url = API_URL_BACK_END.replace("#", "clientes");
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

export const saveCliente = async (data) => {
  const url = API_URL_BACK_END.replace("#", "clientes");
  console.log("FORM cliente: ", data);
  try {
    const formData = {
      nif: data.nif,
      nombre_apellidos:
        data.nombre_apellidos === "" ? null : data.nombre_apellidos,
      razon_social: data.razon_social === "" ? null : data.razon_social,
      numero_telefono: data.numero_telefono,
      correo_electronico: data.correo_electronico,
      direccion: data.direccion,
      codigo_postal: data.codigo_postal,
      ciudad: data.ciudad,
      provincia: data.provincia,
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

export const getClienteById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "clientes");
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

export const updateCliente = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "clientes");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    const formData = {
      nif: data.nif,
      nombre_apellidos:
        data.nombre_apellidos === "" ? null : data.nombre_apellidos,
      razon_social: data.razon_social === "" ? null : data.razon_social,
      numero_telefono: data.numero_telefono,
      correo_electronico: data.correo_electronico,
      direccion: data.direccion,
      codigo_postal: data.codigo_postal,
      ciudad: data.ciudad,
      provincia: data.provincia,
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

export const deleteCliente = async (id) => {
  const url = API_URL_BACK_END.replace("#", "clientes");
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
