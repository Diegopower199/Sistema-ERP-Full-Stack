import axios from "axios";
import { API_URL } from "@/context/constants";

export const getAllPersonas = async () => {
  const url = API_URL.replace("#", "personas");

  try {
    const response = await axios.get(url + "getAll");
    return response.data;
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const savePersona = async (data) => {
  const url = API_URL.replace("#", "personas");
  console.log("FORM: ", data);
  try {
    let formData = {};
    formData["numero_empleado"] = parseInt(data.numero_empleado);
    formData["nombre"] = data.nombre;
    formData["apellidos"] = data.apellidos;
    formData["genero"] = data.genero;
    formData["fecha_nacimiento"] = data.fecha_nacimiento;
    formData["dni"] = data.dni;
    formData["direccion"] = data.direccion;
    formData["numero_telefono"] = data.numero_telefono;
    formData["correo_electronico"] = data.correo_electronico;
    formData["tipo_persona"] = {
      id_tipo_persona: parseInt(data.id_tipo_persona),
    };
    console.log("Form hecho: ", formData);
    const response = await axios.post(url + "save", formData);

    //console.log("Response data: ", response.data);
    //console.log("\nResponse status: ", response.status);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // console.log("Error response data: ", error.response.data.message, "\nError response status: ", error.response.status);
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const getPersonaById = async (id) => {
  const url = API_URL.replace("#", "personas");
  try {
    const response = await axios.get(url + "getById/" + id);
    //console.log("Response data: ", response.data);
    //console.log("\nResponse status: ", response.status);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // console.log("Error response data: ", error.response.data.message, "\nError response status: ", error.response.status);
    return {
      errorMessage: error.response.data.message, // Error message
      status: error.response.status,
    };
  }
};

export const updatePersona = async (id, data) => {
  const url = API_URL.replace("#", "personas");
  try {
    let formData = {};
    formData["numero_empleado"] = parseInt(data.numero_empleado);
    formData["nombre"] = data.nombre;
    formData["apellidos"] = data.apellidos;
    formData["genero"] = data.genero;
    formData["fecha_nacimiento"] = data.fecha_nacimiento;
    formData["dni"] = data.dni;
    formData["direccion"] = data.direccion;
    formData["numero_telefono"] = data.numero_telefono;
    formData["correo_electronico"] = data.correo_electronico;
    formData["tipo_persona"] = {
      id_tipo_persona: parseInt(data.id_tipo_persona),
    };
    console.log("Form hecho: ", formData, "\nID: ", id);

    const response = await axios.put(url + "update/" + id, formData);
    //console.log("Response data: ", response.data);
    //console.log("\nResponse status: ", response.status);
    return response;
  } catch (error) {
    console.log("Error response data: ", error.response.data.message);
    console.log("\nError response status: ", error.response.status);

    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const deletePersona = async (id) => {
  const url = API_URL.replace("#", "personas");
  try {
    const response = await axios.delete(url + "delete/" + id);
    console.log("Response delete: ", response);
    return "ELIMINADO";
  } catch (error) {
    console.log("Error response data: ", error.response.data);
    console.log("\nError response status: ", error.response.status);
    // Poner abajo el error y el status como en update
    return "ERROR AL ELIMINAR";
  }
};
