import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposUsuarios = async () => {
  const url = API_URL_BACK_END.replace("#", "tiposUsuarios");
  try {
    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposUsuarios es: ", response);
    const promises = response.data.map((tipoUsuario) => {
      return {
        value: tipoUsuario.id_tipo_usuario,
        label: tipoUsuario.tipo_usuario,
      };
    });
    console.log("Promises de getAllTiposUsuarios son: ", promises);
    return promises;
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

export const getTipoUsuarioById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "tiposUsuarios");
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
