import axios from "axios";
import { API_URL } from "@/context/constants";

export async function getAllMotivosBajas() {
  try {
    const url = API_URL.replace("#", "motivosBajas");

    const response = await axios.get(url + "getAll");
    console.log("Response de getAllMotivosBajas es: ", response);
    const promises = response.data.map((motivoBaja) => {
      return {
        value: motivoBaja.id_motivo_baja,
        label: motivoBaja.motivo_baja,
      };
    });
    console.log("Promises de getAllMotivosBajas son: ", promises);
    return promises;
  } catch (error) {
    console.error();
    return "Error";
  }
}
