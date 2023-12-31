import axios from "axios";
import { API_URL } from "@/context/constants";

export async function getAllTiposSolicitudes() {
  const url = API_URL.replace("#", "tiposSolicitudes");
  try {
    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposSolicitudes es: ", response);
    const promises = response.data.map((tipoSolicitud) => {
      return {
        value: tipoSolicitud.id_tipo_solicitud,
        label: tipoSolicitud.tipo_solicitud,
      };
    });
    console.log("Promises de getAllTiposSolicitudes son: ", promises);
    return promises;
  } catch (error) {
    console.error();
    return "Error";
  }
}
