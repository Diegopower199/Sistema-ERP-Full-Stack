import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllFacturasClientes = async () => {
  const url = API_URL_BACK_END.replace("#", "facturasClientes");
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

export const saveFacturaCliente = async (data) => {
  const url = API_URL_BACK_END.replace("#", "facturasClientes");
  console.log("FORM PERSONA: ", data);
  try {
    const formData = {};

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

export const getFacturaClienteById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "facturasClientes");
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

export const updateFacturaCliente = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "facturasClientes");
  console.log(`FORM PERSONA CON id ${id}: `, data);
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

export const deleteFacturaCliente = async (id) => {
  const url = API_URL_BACK_END.replace("#", "facturasClientes");
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
