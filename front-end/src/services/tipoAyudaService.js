import axios from "axios";
import { API_URL } from "@/context/constants";

export async function getAllTiposAyudas() {
  try {
    const url = API_URL.replace("#", "tiposAyudas");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposAyudas es: ", response);
    const promises = response.data.map((tipoAyuda) => {
      return {
        value: tipoAyuda.id_tipo_ayuda,
        label: tipoAyuda.tipo_ayuda,
      };
    });
    console.log("Promises de getAllTiposAyudas son: ", promises);
    return promises;
  } catch (error) {
    console.error();
    return "Error";
  }
}
