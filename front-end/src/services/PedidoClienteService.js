import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";
import { asignarNullSiCadenaVacia } from "@/utils/helpers";
import { backendServerDownErrorMessageContent } from "@/utils/differentContentServerErrorMessage";

export const getAllPedidosClientes = async () => {
  const url = API_URL_BACK_END.replace("#", "pedidosClientes");

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

export const savePedidoCliente = async (data) => {
  const url = API_URL_BACK_END.replace("#", "pedidosClientes");

  try {
    const formData = {
      direccion_entrega: data.direccion_entrega,
      fecha_solicitud_pedido: data.fecha_solicitud_pedido,
      fecha_entrega_prevista: data.fecha_entrega_prevista,
      fecha_entrega_real: data.fecha_entrega_real,
      hora_inicio_desplazamiento: asignarNullSiCadenaVacia(
        data.hora_inicio_desplazamiento
      ),
      hora_fin_desplazamiento: asignarNullSiCadenaVacia(
        data.hora_fin_desplazamiento
      ),
      tiempo_desplazamiento_total: asignarNullSiCadenaVacia(
        data.tiempo_desplazamiento_total
      ),
      hora_inicio_servicio: asignarNullSiCadenaVacia(data.hora_inicio_servicio),
      hora_fin_servicio: asignarNullSiCadenaVacia(data.hora_fin_servicio),
      tiempo_servicio_total: asignarNullSiCadenaVacia(
        data.tiempo_servicio_total
      ),
      descripcion: asignarNullSiCadenaVacia(data.descripcion),
      observacion: asignarNullSiCadenaVacia(data.observacion),
      cliente: {
        id_cliente: parseInt(data.id_cliente),
      },
      persona_encargado: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
      },
      tipo_estado_factura: {
        id_tipo_estado_factura: parseInt(data.id_tipo_estado_factura),
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

export const getPedidoClienteById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "pedidosClientes");

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

export const updatePedidoCliente = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "pedidosClientes");

  try {
    const formData = {
      direccion_entrega: data.direccion_entrega,
      fecha_solicitud_pedido: data.fecha_solicitud_pedido,
      fecha_entrega_prevista: data.fecha_entrega_prevista,
      fecha_entrega_real: data.fecha_entrega_real,
      hora_inicio_desplazamiento: asignarNullSiCadenaVacia(
        data.hora_inicio_desplazamiento
      ),
      hora_fin_desplazamiento: asignarNullSiCadenaVacia(
        data.hora_fin_desplazamiento
      ),
      tiempo_desplazamiento_total: asignarNullSiCadenaVacia(
        data.tiempo_desplazamiento_total
      ),
      hora_inicio_servicio: asignarNullSiCadenaVacia(data.hora_inicio_servicio),
      hora_fin_servicio: asignarNullSiCadenaVacia(data.hora_fin_servicio),
      tiempo_servicio_total: asignarNullSiCadenaVacia(
        data.tiempo_servicio_total
      ),
      descripcion: asignarNullSiCadenaVacia(data.descripcion),
      observacion: asignarNullSiCadenaVacia(data.observacion),
      cliente: {
        id_cliente: parseInt(data.id_cliente),
      },
      persona_encargado: {
        id_persona: parseInt(data.id_persona),
      },
      tipo_estado: {
        id_tipo_estado: parseInt(data.id_tipo_estado),
      },
      tipo_estado_factura: {
        id_tipo_estado_factura: parseInt(data.id_tipo_estado_factura),
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

export const deletePedidoCliente = async (id) => {
  const url = API_URL_BACK_END.replace("#", "pedidosClientes");

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
