import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposEstadosFacturas = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "tiposEstadosFacturas");

    const response = await axios.get(url + "getAll");

    if (response.status === 204) {
      return {
        data: [],
        status: response.status,
      };
    }

    const promises = response.data.map((tipoEstadoFactura) => {
      return {
        value: tipoEstadoFactura.id_tipo_estado_factura,
        label: tipoEstadoFactura.tipo_estado_factura,
      };
    });

    return {
      data: promises,
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
