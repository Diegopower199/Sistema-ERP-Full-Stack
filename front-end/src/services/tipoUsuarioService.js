import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export async function getAllTiposUsuarios() {
  const url = API_URL_BACK_END.replace("#", "tiposUsuarios");
  try {
    const response = await axios.get(url + "getAll");
    console.log("Response de getAllTiposUsuarios es: ", response);
    const promises = response.data.map((tipoUsuario) => {
      return {
        value: tipoUsuario.id_tipo_usuario,
        label: tipoUsuario.tipo_usuario,
      };
    });
    console.log("Promises de getAllTiposUsuarios son: ", promises);
    return promises;
  } catch (error) {
    console.error();
    return "Error";
  }
}
