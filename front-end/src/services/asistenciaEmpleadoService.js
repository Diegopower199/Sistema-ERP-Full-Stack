import axios from "axios";
import { API_URL } from "@/context/constants";

export const getAllAsistenciaEmpleados = async () => {
  const url = API_URL.replace("#", "asistenciasEmpleados");

  try {
    const response = await axios.get(url + "getAll");
    return response.data;
  } catch (error) {
    console.error();
    return "Error";
  }
};

export const startOfWorkdayAsistenciaEmpleado = async (data) => { // Inicio de la jornada laboral
  const url = API_URL.replace("#", "asistenciasEmpleados");
  console.log("FORM PERSONA: ", data);
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
    const response = await axios.post(url + "startOfWorkday", formData);

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

export const endOfWorkdayAsistenciaEmpleado = async (data) => { // Fin de la jornada laboral (NO ESTE BIEN, NO SÉ IDENTIFICARLO)
  const url = API_URL.replace("#", "asistenciasEmpleados");
  console.log("FORM ASISTENCIA EMPLEADO: ", data);
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
    const response = await axios.post(url + "endOfWorkday", formData);

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

export const getAsistenciaEmpleadoById = async (id) => {
  const url = API_URL.replace("#", "asistenciasEmpleados");
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

export const updateAsistenciaEmpleado = async (id, data) => {
  const url = API_URL.replace("#", "asistenciasEmpleados");
  console.log(`FORM ASISTENCIA EMPLEADO CON id ${id}: `, data);
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

export const deleteAsistenciaEmpleado = async (id) => {
  const url = API_URL.replace("#", "asistenciasEmpleados");
  try {
    const response = await axios.delete(url + "delete/" + id);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      errorMessage: error.response.data,
      status: error.response.status,
    };
  }
};
