import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTiposEstadosFacturas = async () => {
  try {
    const url = API_URL_BACK_END.replace("#", "tiposEstadosFacturas");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposEstados es: ", response);
    const promises = response.data.map((tipoEstadoFactura) => {
      return {
        value: tipoEstadoFactura.id_tipo_estado_factura,
        label: tipoEstadoFactura.tipo_estado_factura,
      };
    });
    console.log("Promises de getAllTiposEstadosFacturas son: ", promises);
    return promises;
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
