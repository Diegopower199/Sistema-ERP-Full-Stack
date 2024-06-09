import { API_URL_BACK_END } from "@/utils/constants";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";
import { asignarNullSiCadenaVacia } from "@/utils/helpers";
import axios from "axios";

export const getAllBajasLaboralesEmpleados = async () => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

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

export const saveBajaLaboralEmpleado = async (data) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      motivo_baja: {
        id_motivo_baja: parseInt(data.id_motivo_baja),
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

export const getBajaLaboralEmpleadoById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

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

export const updateBajaLaboralEmpleado = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

  try {
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      observacion: asignarNullSiCadenaVacia(data.observacion),
      persona: {
        id_persona: parseInt(data.id_persona),
      },
      motivo_baja: {
        id_motivo_baja: parseInt(data.id_motivo_baja),
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

export const deleteBajaLaboralEmpleado = async (id) => {
  const url = API_URL_BACK_END.replace("#", "bajasLaboralesEmpleados");

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
