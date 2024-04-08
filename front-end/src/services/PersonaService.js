import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllPersonas = async () => {
  const url = API_URL_BACK_END.replace("#", "personas");
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

export const savePersona = async (data) => {
  const url = API_URL_BACK_END.replace("#", "personas");
  console.log("FORM PERSONA: ", data);
  try {
    const formData = {
      numero_empleado: parseInt(data.numero_empleado),
      nombre: data.nombre,
      apellidos: data.apellidos,
      genero: data.genero,
      fecha_nacimiento: data.fecha_nacimiento,
      dni: data.dni,
      direccion: data.direccion,
      numero_telefono: data.numero_telefono,
      correo_electronico: data.correo_electronico,
      tipo_persona: {
        id_tipo_persona: parseInt(data.id_tipo_persona),
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

export const getPersonaById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "personas");
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

export const updatePersona = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "personas");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    const formData = {
      numero_empleado: parseInt(data.numero_empleado),
      nombre: data.nombre,
      apellidos: data.apellidos,
      genero: data.genero,
      fecha_nacimiento: data.fecha_nacimiento,
      dni: data.dni,
      direccion: data.direccion,
      numero_telefono: data.numero_telefono,
      correo_electronico: data.correo_electronico,
      tipo_persona: {
        id_tipo_persona: parseInt(data.id_tipo_persona),
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

export const deletePersona = async (id) => {
  const url = API_URL_BACK_END.replace("#", "personas");
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

export const existsCorreoElectronico = async (correo_electronico) => {
  const url = API_URL_BACK_END.replace("#", "personas");
  try {
    const response = await axios.post(
      url + "getExistsCorreoElectronico/" + correo_electronico
    );

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
