import axios from "axios";
import { API_URL } from "@/utils/constants";

export async function getAllTiposPersonas() {
  const url = API_URL.replace("#", "tiposPersonas");
  try {
    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposPersonas es: ", response);
    const promises = response.data.map((tipoPersona) => {
      return {
        value: tipoPersona.id_tipo_persona,
        label: tipoPersona.tipo_persona,
      };
    });
    console.log("Promises de getAllTiposPersonas son: ", promises);
    return promises;
  } catch (error) {
    console.error();
    return "Error";
  }
}
