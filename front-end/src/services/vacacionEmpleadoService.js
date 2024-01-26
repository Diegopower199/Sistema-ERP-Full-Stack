import axios from "axios";
import { API_URL } from "@/context/constants";

export const getAllVacacionesEmpleados = async () => {
  const url = API_URL.replace("#", "vacacionesEmpleados");

  try {
    const response = await axios.get(url + "getAll");
    return response.data;
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const saveVacacionEmpleado = async (data) => { // Los dias los calculo en el back
  const url = API_URL.replace("#", "vacacionesEmpleados");
  console.log("FORM PERSONA: ", data);
  try {
    let formData = {};
    formData["fecha_inicio"] = data.fecha_inicio;
    formData["fecha_fin"] = data.fecha_fin;
    formData["comentarios"] = data.comentarios;
    formData["persona"] = {
      dni: data.dni,
    };
    formData["tipo_estado"] = {
      id_tipo_estado: parseInt(data.id_tipo_estado),
    };
    console.log("FORM DATA: ", formData)
    const response = await axios.post(url + "save", formData);

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

export const getVacacionEmpleadoById = async (id) => {
  const url = API_URL.replace("#", "vacacionesEmpleados");
  try {
    const response = await axios.get(url + "getById/" + id);
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

export const updateVacacionEmpleado = async (id, data) => { // Los dias los calculo en el back, si los rechazo se devuelven los datos anteriores
  const url = API_URL.replace("#", "vacacionesEmpleados");
  console.log(`FORM PERSONA CON id ${id}: `, data);
  try {
    let formData = {};
    formData["numero_empleado"] = parseInt(data.numero_empleado);
    formData["nombre"] = data.nombre;
    formData["apellidos"] = data.apellidos;
    formData["genero"] = data.genero;
    formData["fecha_nacimiento"] = data.fecha_nacimiento;
    formData["dni"] = data.dni;
    formData["direccion"] = data.direccion;
    formData["numero_telefono"] = data.numero_telefono;
    formData["correo_electronico"] = data.correo_electronico;
    formData["tipo_persona"] = {
      id_tipo_persona: parseInt(data.id_tipo_persona),
    };
    console.log("Form hecho: ", formData, "\nID: ", id);

    const response = await axios.put(url + "update/" + id, formData);
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

export const deleteVacacionEmpleado = async (id) => {
  const url = API_URL.replace("#", "vacacionesEmpleados");
  try {
    const response = await axios.delete(url + "delete/" + id);
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
