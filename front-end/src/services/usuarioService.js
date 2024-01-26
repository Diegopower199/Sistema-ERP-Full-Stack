import axios from "axios";
import { API_URL } from "@/context/constants";

export const getAllUsuarios = async () => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.get(url + "getAll");
    return response.data;
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const saveUsuario = async (data) => {
  const url = API_URL.replace("#", "usuarios");
  console.log("FORM PERSONA: ", data);
  try {
    let formData = {};
    formData["nombre_usuario"] = data.nombre_usuario;
    formData["password"] = data.password;
    formData["persona"] = { id_persona: parseInt(data.id_persona) };
    formData["tipo_usuario"] = {
      id_tipo_usuario: parseInt(data.id_tipo_usuario),
    };
    console.log("Form hecho: ", formData);
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

export const getUsuarioById = async (id) => {
  const url = API_URL.replace("#", "usuarios");
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

export const updateUsuario = async (id, data) => {
  const url = API_URL.replace("#", "usuarios");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    let formData = {};
    formData["nombre_usuario"] = data.nombre_usuario;
    formData["password"] = data.password;
    formData["persona"] = { id_persona: parseInt(data.id_persona) };
    formData["tipo_usuario"] = {
      id_tipo_usuario: parseInt(data.id_tipo_usuario),
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

export const deleteUsuario = async (id) => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.delete(url + "delete/" + id);
    console.log("Response delete: ", response);
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

export const authenticateUser = async (nombre_usuario, password) => {
  const data = {
    nombre_usuario: nombre_usuario,
    password: password,
  };

  const url = API_URL.replace("#", "usuarios");

  try {
    const response = await axios.post(url + "login", data);
    console.log("Response es: ", response);
    return {
      data: response.data.resultado,
      status: response.status,
    }
  } catch (error) {
    console.error(error);
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const getUsuarioByNombreUsuario = async (nombre_usuario) => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.get(
      url + "getByNombreUsuario/" + nombre_usuario
    );

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
