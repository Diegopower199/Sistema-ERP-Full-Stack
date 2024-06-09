import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";
import axios from "axios";

export const getAllUsuarios = async () => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

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
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};

export const saveUsuario = async (data) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const formData = {
      nombre_usuario: data.nombre_usuario,
      password: data.password,
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_usuario: {
        id_tipo_usuario: parseInt(data.id_tipo_usuario),
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
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};

export const getUsuarioById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

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
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};

export const updateUsuario = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const formData = {
      nombre_usuario: data.nombre_usuario,
      password: data.password,
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_usuario: {
        id_tipo_usuario: parseInt(data.id_tipo_usuario),
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
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};

export const deleteUsuario = async (id) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

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
        errorMessage: backendServerDownErrorMessageContent,
        status: 500,
      };
    }
  }
};

export const authenticateUser = async (nombre_usuario, password) => {
  const data = {
    nombre_usuario: nombre_usuario,
    password: password,
  };

  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const response = await axios.post(url + "login", data);

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

export const updatePassword = async (data) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const formData = {
      correo_electronico: data.correo_electronico,
      new_password: data.new_password,
    };

    const response = await axios.put(url + "updatePassword", formData);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: backendServerDownErrorMessageContent,
      status: 500,
    };
  }
};

export const getUsuarioByNombreUsuario = async (nombre_usuario) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const response = await axios.get(
      url + "getByNombreUsuario/" + nombre_usuario
    );

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
