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

export const saveUsuario = async (args) => {
  const url = API_URL.replace("#", "usuarios");
  console.log("FORM: ", args);
  try {
    let form = {};
    form["nombre_usuario"] = args.nombre_usuario;
    form["password"] = args.password;
    form["persona"] = { id_persona: parseInt(args.id_persona) };
    form["tipo_usuario"] = { id_tipo_usuario: parseInt(args.id_tipo_usuario) };
    console.log("Form hecho: ", form);
    const response = await axios.post(url + "save", form);

    // console.log("Response data: ", response.data, "\nResponse status: ", response.status);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // console.log("Error response data: ", error.response.data.message, "\nError response status: ", error.response.status);
    return {
      messageError: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const getUsuarioById = async (id) => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.get(url + "getById/" + id);

    console.log(
      "Response data: ",
      response.data,
      "\nResponse status: ",
      response.status
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // console.log("Error response data: ", error.response.data.message, "\nError response status: ", error.response.status);
    return {
      messageError: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const updateUsuario = async (id, data) => {
  const url = API_URL.replace("#", "usuarios");
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
    console.log(
      "Response data: ",
      response.data,
      "\nResponse status: ",
      response.status
    );
    return response;
  } catch (error) {
    console.log(
      "Error response data: ",
      error.response.data.message,
      "\nError response status: ",
      error.response.status
    );
    return {
      messageError: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const deleteUsuario = async (id) => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.delete(url + "delete/" + id);
    console.log("Response delete: ", response);
    return "ELIMINADO";
  } catch (error) {
    console.log(
      "Error response data: ",
      error.response.data,
      "\nError response status: ",
      error.response.status
    );
    // Poner abajo el error y el status como en update
    return "ERROR AL ELIMINAR";
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
    console.log("Response es: ", response.data.resultado);
    return response.data.resultado;
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const getUsuarioByNombreUsuario = async (nombre_usuario) => {
  const url = API_URL.replace("#", "usuarios");
  try {
    const response = await axios.get(
      url + "getByNombreUsuario/" + nombre_usuario
    );

    console.log(
      "Response data: ",
      response.data,
      "\nResponse status: ",
      response.status
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // console.log("Error response data: ", error.response.data.message, "\nError response status: ", error.response.status);
    return {
      messageError: error.response.data.message,
      status: error.response.status,
    };
  }
};
