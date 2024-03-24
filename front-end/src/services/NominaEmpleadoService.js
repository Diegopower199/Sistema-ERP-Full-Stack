import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllNominasEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "nominasEmpleados");
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

export const saveNominaEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "nominasEmpleados");
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

export const getNominaEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "nominasEmpleados");
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

export const updateNominaEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "nominasEmpleados");
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

export const deleteNominaEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "nominasEmpleados");
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
