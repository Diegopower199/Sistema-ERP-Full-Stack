import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllPagosFacturasClientes = async () => {
  const url = API_URL_BACK_END.replace("#", "pagosFacturasClientes");
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

export const savePagoFacturaCliente = async (data) => {
  const url = API_URL_BACK_END.replace("#", "pagosFacturasClientes");
  console.log("FORM PERSONA: ", data);
  try {
    const formData = {
      fecha_pago_realizada: data.fecha_pago_realizada,
      importe_pagado: parseInt(data.importe_pagado),
      metodo_pago: data.metodo_pago,
      factura_cliente: {
        id_factura_cliente: data.id_factura_cliente,
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

export const getPagoFacturaClienteById = async (id) => {
  const url = API_URL_BACK_END.replace("#", "pagosFacturasClientes");
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

export const updatePagoFacturaCliente = async (id, data) => {
  const url = API_URL_BACK_END.replace("#", "pagosFacturasClientes");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    const formData = {
      fecha_pago_realizada: data.fecha_pago_realizada,
      importe_pagado: parseInt(data.importe_pagado),
      metodo_pago: data.metodo_pago,
      factura_cliente: {
        id_factura_cliente: data.id_factura_cliente,
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

export const deletePagoFacturaCliente = async (id) => {
  const url = API_URL_BACK_END.replace("#", "pagosFacturasClientes");
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
