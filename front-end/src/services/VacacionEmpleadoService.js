import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";
import { asignarNullSiCadenaVacia } from "@/utils/helpers";
import axios from "axios";

export const getAllVacacionesEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

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

export const saveVacacionEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
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

export const getVacacionEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

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

export const updateVacacionEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
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

export const deleteVacacionEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "vacacionesEmpleados");

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
