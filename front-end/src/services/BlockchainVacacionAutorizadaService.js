import axios from "axios";
import { API_URL_BACK_END } from "@/utils/constants";

export const getAllTransaccionesVacacionesAutorizadas = async () => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");

  try {
    const response = await axios.get(url + "getAll");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: (
        <div>
          <h1>¡Error Técnico en Nuestro Servidor de Blockchain!</h1>
          <p>
            Lo sentimos mucho, pero en estos momentos estamos enfrentando
            dificultades técnicas con nuestro servidor de blockchain. Esto puede
            causar una interrupción temporal en la disponibilidad de algunos de
            nuestros servicios.
          </p>
          <p>
            Estamos trabajando incansablemente para resolver este problema tan
            pronto como sea posible. Apreciamos enormemente su paciencia y
            comprensión mientras trabajamos en una solución.
          </p>
          <p>
            Por favor, le pedimos que vuelva a intentarlo más tarde. Si tiene
            alguna pregunta o inquietud, no dude en ponerse en contacto con
            nuestro equipo de soporte.
          </p>
          <p>¡Gracias por su comprensión y disculpe las molestias!</p>
        </div>
      ),
      status: error.response.status,
    };
  }
};

export const saveTransaccionVacacionAutorizada = async (data) => {
  const url = API_URL_BACK_END.replace("#", "blockchainVacacionesAutorizadas");
  console.log("FORM blockchain Vacaciones Autorizadas: ", data);
  try {
    let formData = {
      id_vacacion_empleado: data.id_vacacion_empleado,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      dias_disponibles: parseInt(data.dias_disponibles),
      dias_pendientes: parseInt(data.dias_pendientes),
      dias_solicitados: parseInt(data.dias_solicitados),
      dias_disfrutados: parseInt(data.dias_disfrutados),
      observacion: data.observacion,
      dni: data.dni,
      tipo_estado: data.tipo_estado,
    };

    const response = await axios.post(url + "save", formData);
    console.log("Response: ", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data.message,
      status: error.response.status,
    };
  }
};
