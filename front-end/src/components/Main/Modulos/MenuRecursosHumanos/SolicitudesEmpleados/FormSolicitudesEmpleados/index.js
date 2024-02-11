import React, { useEffect, useState } from "react";
import { savePersona, updatePersona } from "@/services/PersonaService";
import { getAllTiposPersonas } from "@/services/TipoPersonaService";
import { REGEX_DATE_YYYYMMDD } from "@/utils/regexPatterns";
import { getAllTiposSolicitudes } from "@/services/TipoSolicitudService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";

export default function FormSolicitudesEmpleados({
  toggleForm,
  solicitudEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposSolicitudesOptions, setTiposSolicitudesOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_solicitud: "",
    comentarios: "",
    dni: "",
    id_tipo_solicitud: "1",
    id_tipo_estado: "1",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposPersonasOptions = async () => {
    try {
      const responseReadAllTiposPersonas = await getAllTiposPersonas();
      // console.log("Resultado: ", resultado);
      setTiposPersonasOptions(responseReadAllTiposPersonas);
      setFormData((prevState) => {
        return {
          ...prevState,
          ["id_tipo_persona"]: responseReadAllTiposPersonas[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  const fetchTiposSolicitudesOptions = async () => {
    try {
      const responseReadAllTiposSolicitudes = await getAllTiposSolicitudes();
      setTiposSolicitudesOptions(responseReadAllTiposSolicitudes);
      setFormData((prevState) => {
        return {
          ...prevState,
          ["id_tipo_solicitud"]: responseReadAllTiposSolicitudes[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

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
        await fetchTiposPersonasOptions();
        await fetchTiposSolicitudesOptions();
        await fetchTiposEstadosOptions();

        console.log("operationType: ", operationType);

        if (operationType === "update" || operationType === "view") {
          if (
            validarFechaYYYYMMDD(solicitudEmpleadoDataForm.fecha_solicitud) ===
            null
          ) {
            const fechaSolicitudFormateada = formatearFechaAYYYYMMDD(
              solicitudEmpleadoDataForm.fecha_solicitud
            );

            console.log("fechaFormateada: ", fechaSolicitudFormateada);

            setFormData(() => ({
              ...solicitudEmpleadoDataForm,
              fecha_solicitud: fechaSolicitudFormateada,
            }));
          } else {
            setFormData(() => ({
              ...solicitudEmpleadoDataForm,
            }));
          }
        }
      } catch (error) {
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errorDevueltoBack = false;
    try {
      if (operationType === "create") {
        const responseCreatePersona = await savePersona(formData);
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseCreatePersona
        );

        if (responseCreatePersona.status !== 200) {
          const mensajeError = responseCreatePersona.errorMessage;
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
        const responseUpdatePersona = await updatePersona(
          formData.id,
          formData
        );
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseUpdatePersona
        );

        if (responseUpdatePersona.status !== 200) {
          const mensajeError = responseUpdatePersona.errorMessage;
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
      }
    } catch (error) {
      console.log("Error al agregar registro: ", error);
    }
  };

  // https://es.stackoverflow.com/questions/289413/bloquear-n%C3%BAmeros-letras-y-o-caracteres-especiales-en-un-input MIRARME ESTO

  return (
    <>
      <label>
        Fecha de solicitud:
        <input
          type="date"
          name="fecha_solicitud"
          value={formData.fecha_solicitud}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />
      <label>
        Comentarios:
        <input
          type="text"
          name="comentarios"
          value={formData.comentarios}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />
      <label>
        Dni persona:
        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />

      <br />
      <br />
      <label>
        Selecciona un tipo de persona:
        <select
          name="id_tipo_persona"
          value={formData.id_tipo_persona}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        >
          {tiposPersonasOptions.map((tipoPersona, index) => (
            <option key={tipoPersona.value} value={tipoPersona.value}>
              {tipoPersona.label}
            </option>
          ))}
        </select>
      </label>
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
