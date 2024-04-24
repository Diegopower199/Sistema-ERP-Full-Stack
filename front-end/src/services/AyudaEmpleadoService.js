import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { asignarNullSiCadenaVacia } from "@/utils/helpers";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllAyudasEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "ayudasEmpleados");

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

export const saveAyudaEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "ayudasEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      valor_asociado: parseInt(data.valor_asociado),
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_ayuda: {
        id_tipo_ayuda: parseInt(data.id_tipo_ayuda),
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
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

export const getAyudaEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "ayudasEmpleados");

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

export const updateAyudaEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "ayudasEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      valor_asociado: parseInt(data.valor_asociado),
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_ayuda: {
        id_tipo_ayuda: parseInt(data.id_tipo_ayuda),
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
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

export const deleteAyudaEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "ayudasEmpleados");

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
