import React, { useEffect, useState } from "react";
import { REGEX_DATE_YYYYMMDD } from "@/utils/regexPatterns";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  saveVacacionEmpleado,
  updateVacacionEmpleado,
} from "@/services/VacacionEmpleadoService";
import moment from "moment";
import { saveTransaccionVacacionAutorizada } from "@/services/BlockchainVacacionAutorizadaService";

export default function FormVacacionesEmpleados({
  toggleForm,
  vacacionEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    dias_disponibles: "0",
    dias_pendientes: "0",
    dias_solicitados: "0",
    dias_disfrutados: "0",
    comentarios: "",
    dni: "",
    id_tipo_estado: "1",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposEstadosOptions = async () => {
    try {
      const responseReadAllTiposEstados = await getAllTiposEstados();
      setTiposEstadosOptions(responseReadAllTiposEstados);
      setFormData((prevState) => {
        return {
          ...prevState,
          ["id_tipo_estado"]: responseReadAllTiposEstados[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  function validarFechaYYYYMMDD(fecha) {
    return fecha.match(REGEX_DATE_YYYYMMDD);
  }

  function formatearFechaAYYYYMMDD(fechaConFormatoOriginal) {
    const [dia, mes, year] = fechaConFormatoOriginal.split("-");
    const fechaFormateada = `${year}-${mes}-${dia}`;
    return fechaFormateada;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposEstadosOptions();

        console.log("operationType: ", operationType, vacacionEmpleadoDataForm);

        if (operationType === "update" || operationType === "view") {
          setFormData(() => ({
            ...vacacionEmpleadoDataForm,
          }));
        }
      } catch (error) {
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    console.log("event", event);
    const { name, value, type, checked } = event.target;
    if (name === "numero_telefono") {
      // Si el valor no comienza con "34", mantenlo con "34" al principio
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      // Actualiza el estado con el nuevo valor
      setFormData((prevFormValue) => ({
        ...prevFormValue,
        [name]: nuevoValor,
      }));
    } else {
      console.log("value: ", value);
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errorDevueltoBack = false;
    try {
      if (operationType === "create") {
        const responseCreateVacacion = await saveVacacionEmpleado(formData);
        console.log(
          `Response en handleSubmit en ${operationType} : `,
          responseCreateVacacion
        );

        if (responseCreateVacacion.status !== 200) {
          const mensajeError = responseCreateVacacion.errorMessage;
          console.log("El error es: ", mensajeError);
          setErrorMessage(mensajeError);
          errorDevueltoBack = true;
        } else {
          errorDevueltoBack = false;
        }

        if (!errorDevueltoBack) {
          setErrorMessage("");
          toggleForm();
          formUpdateTrigger();
        }
      } else if (operationType === "update") {
        const responseUpdateVacacion = await updateVacacionEmpleado(
          formData.id,
          formData
        );

        console.log(
          `Response en handleSubmit en ${operationType} : `,
          responseUpdateVacacion
        );

        if (responseUpdateVacacion.status !== 200) {
          const mensajeError = responseUpdateVacacion.errorMessage;
          console.log("El error es: ", mensajeError);
          setErrorMessage(mensajeError);
          errorDevueltoBack = true;
        } else {
          if (
            responseUpdateVacacion.data.tipo_estado.tipo_estado === "Aprobado"
          ) {
            const dataVacacionAutorizada = {
              id_vacacion_empleado:
                responseUpdateVacacion.data.id_vacacion_empleado,
              fecha_inicio: responseUpdateVacacion.data.fecha_inicio,
              fecha_fin: responseUpdateVacacion.data.fecha_fin,
              dias_disponibles: responseUpdateVacacion.data.dias_disponibles,
              dias_pendientes: responseUpdateVacacion.data.dias_pendientes,
              dias_solicitados: responseUpdateVacacion.data.dias_solicitados,
              dias_disfrutados: responseUpdateVacacion.data.dias_disfrutados,
              comentarios: responseUpdateVacacion.data.comentarios,
              dni: responseUpdateVacacion.data.persona.dni,
              tipo_estado: responseUpdateVacacion.data.tipo_estado.tipo_estado,
            };

            const responseCreateBlockchainVacacionAutorizada =
              await saveTransaccionVacacionAutorizada(dataVacacionAutorizada);

            console.log(
              "responseCreateBlockchainVacacionAutorizada: ",
              responseCreateBlockchainVacacionAutorizada
            );

            if (responseCreateBlockchainVacacionAutorizada.status !== 200) {
              const mensajeError =
                responseCreateBlockchainVacacionAutorizada.errorMessage;
              console.log("El error es: ", mensajeError);
              setErrorMessage(mensajeError);
              errorDevueltoBack = true;
            }
          }

          errorDevueltoBack = false;
        }

        if (!errorDevueltoBack) {
          setErrorMessage("");
          toggleForm();
          formUpdateTrigger();
        }
      }
    } catch (error) {
      console.log("Error al agregar registro: ", error);
    }
  };

  // https://es.stackoverflow.com/questions/289413/bloquear-n%C3%BAmeros-letras-y-o-caracteres-especiales-en-un-input MIRARME ESTO

  return (
    <>
      AQUI TENGO QUE HACER LO DE TIPOS DE SOLICITUDES PORQUE DESDE AQUI LLAMO A
      LA FUNCION DE CREAR O ACTUALIZAR EL TIPO DE SOLICITUD
      <br />
      <br />
      <label>
        Fecha inicio:
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          placeholder="Fecha inicio"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />
      <label>
        Fecha fin:
        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          placeholder="Fecha fin"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Dias disponibles:
            <input
              type="number"
              name="dias_disponibles"
              value={formData.dias_disponibles}
              readOnly={true}
            />
          </label>
          <br />
          <br />
          <label>
            Dias pendientes:
            <input
              type="number"
              name="dias_pendientes"
              value={formData.dias_pendientes}
              readOnly={true}
            />
          </label>
          <br />
          <br />
          <label>
            Dias solicitados:
            <input
              type="number"
              name="dias_solicitados"
              value={formData.dias_solicitados}
              readOnly={true}
            />
          </label>
          <br />
          <br />
          <label>
            Dias disfrutados:
            <input
              type="number"
              name="dias_disfrutados"
              value={formData.dias_disfrutados}
              readOnly={true}
            />
          </label>
        </>
      )}
      <br />
      <br />
      <label>
        Comentarios:
        <input
          type="text"
          name="comentarios"
          value={formData.comentarios}
          placeholder="Comentarios"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />
      <label>
        Dni:
        <input
          type="text"
          name="dni"
          value={formData.dni}
          placeholder="Dni"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Selecciona un tipo de estado:
            <select
              name="id_tipo_estado"
              value={formData.id_tipo_estado}
              onChange={operationType === "view" ? null : handleChange}
              readOnly={operationType === "view" ? true : false}
            >
              {tiposEstadosOptions.map((tipoEstado, index) => (
                <option key={tipoEstado.value} value={tipoEstado.value}>
                  {tipoEstado.label}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {(operationType === "create" || operationType === "update") && (
        <>
          <br /> <br />
          <button onClick={toggleForm}>Cancelar</button>{" "}
          <button onClick={handleSubmit}>Guardar</button>
        </>
      )}
      {operationType === "view" && (
        <>
          <br /> <br />
          <button onClick={toggleForm}>Salir</button>
        </>
      )}
    </>
  );
}
