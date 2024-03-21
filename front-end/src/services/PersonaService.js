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
    console.error();
    return "Error";
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
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
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
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
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
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
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
    return {
      errorMessage: error.response.data,
      status: error.response.status,
    };
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
    console.log("error", error);
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};
