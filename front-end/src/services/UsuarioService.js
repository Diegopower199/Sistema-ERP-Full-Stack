import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const saveUsuario = async (data) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");
  console.log("FORM USUARIO: ", data);
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const updateUsuario = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");
  console.log(`FORM USUARIO CON id ${id}: `, data);
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
        errorMessage:
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde",
        status: 500,
      };
    }
  }
};

export const deleteUsuario = async (id) => {
  const url = API_URL_BACK_END.replace("#", "usuarios");
  try {
    const response = await axios.delete(url + "delete/" + id);
    console.log("Response delete: ", response);
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

export const authenticateUser = async (nombre_usuario, password) => {
  const data = {
    nombre_usuario: nombre_usuario,
    password: password,
  };

  const url = API_URL_BACK_END.replace("#", "usuarios");

  try {
    const response = await axios.post(url + "login", data);
    console.log("Response es: ", response);
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
    console.log("error updatePassword: ", error);
    return {
      errorMessage: (
        <div>
          <h1>¡Error Técnico en Nuestro Servidor!</h1>
          <p>
            Lo sentimos mucho, pero en estos momentos estamos enfrentando
            dificultades técnicas con nuestro servidor. Esto puede afectar
            temporalmente la disponibilidad de nuestros servicios en línea.
          </p>
          <p>
            Estamos trabajando diligentemente para resolver este problema lo
            antes posible y restaurar el acceso completo a nuestros servicios.
            Apreciamos su paciencia y comprensión mientras trabajamos en una
            solución.
          </p>
          <p>
            Por favor, tenga en cuenta que durante este tiempo puede
            experimentar dificultades para acceder a nuestras plataformas y
            servicios en línea. Pedimos disculpas por cualquier inconveniente
            que esto pueda causar.
          </p>
          <p>
            Si tiene alguna pregunta o necesita asistencia adicional, no dude en
            ponerse en contacto con nuestro equipo de soporte.
          </p>
          <p>¡Gracias por su comprensión y disculpe las molestias!</p>
        </div>
      ),
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
