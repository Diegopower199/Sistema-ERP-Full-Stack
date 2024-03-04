import React, { useEffect, useState } from "react";
import { savePersona, updatePersona } from "@/services/PersonaService";
import { REGEX_DNI } from "@/utils/regexPatterns";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import { getAllTiposSolicitudes } from "@/services/TipoSolicitudService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  saveSolicitudEmpleado,
  updateSolicitudEmpleado,
} from "@/services/SolicitudEmpleadoService";

export default function FormSolicitudesEmpleados({
  toggleForm,
  solicitudEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposSolicitudesOptions, setTiposSolicitudesOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_solicitud: "",
    observacion: "",
    dni: "",
    id_tipo_solicitud: "1",
    id_tipo_estado: "1",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposSolicitudesOptions = async () => {
    try {
      const responseReadAllTiposSolicitudes = await getAllTiposSolicitudes();
      setTiposSolicitudesOptions(responseReadAllTiposSolicitudes);
      setFormData((prevDataState) => {
        return {
          ...prevDataState,
          ["id_tipo_solicitud"]:
            responseReadAllTiposSolicitudes[0].value.toString(),
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
      setFormData((prevDataState) => {
        return {
          ...prevDataState,
          ["id_tipo_estado"]: responseReadAllTiposEstados[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    /*if (!formData.dni) {
      errorMissingFields.dni = "Por favor, ingresa un DNI";
    }*/

    setRequiredFieldsIncomplete(errorMissingFields);

    console.log("errorMissingFields: ", errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    /*if (!formData.dni.match(REGEX_DNI)) {
      errorForm.dni = "Por favor, ingresa un DNI válido";
    }*/

    setFormErrors(errorForm);
    console.log("errorForm", errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposSolicitudesOptions();
        await fetchTiposEstadosOptions();

        console.log("operationType: ", operationType);

        if (operationType === "update" || operationType === "view") {
          if (
            validarFechaYYYYMMDD(solicitudEmpleadoDataForm.fecha_solicitud) ===
            null
          ) {
            const fechaSolicitudFormateada = formatearFechaYYYYMMDD(
              solicitudEmpleadoDataForm.fecha_solicitud
            );

            console.log("fechaSolicitudFormateada: ", fechaSolicitudFormateada);

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
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      console.log("Error en campos obligatorios: ", requiredFieldsError);
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios "
      );
      return;
    }

    const formDataError = validateFormData();
    if (formDataError) {
      console.log("Error en datos correctos: ", formDataError);
      setErrorMessage("");
      return;
    }

    let errorDevueltoBack = false;
    try {
      if (operationType === "create") {
        const responseCreateSolicitudEmpleado = await saveSolicitudEmpleado(
          formData
        );
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseCreateSolicitudEmpleado
        );

        if (responseCreateSolicitudEmpleado.status !== 200) {
          const mensajeError = responseCreateSolicitudEmpleado.errorMessage;
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
        const responseUpdateSolicitudEmpleado = await updateSolicitudEmpleado(
          formData.id,
          formData
        );
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseUpdateSolicitudEmpleado
        );

        if (responseUpdateSolicitudEmpleado.status !== 200) {
          const mensajeError = responseUpdateSolicitudEmpleado.errorMessage;
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
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.fecha_solicitud ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.fecha_solicitud && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.fecha_solicitud}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
      Observacion:
        <input
          type="text"
          name="observacion"
          value={formData.observacion}
          onChange={operationType === "view" ? null : handleFormChange}
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
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.dni || formErrors.dni
              ? styles.inputError
              : ""
          }
        />
        {requiredFieldsIncomplete.dni && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.dni}
          </div>
        )}
        {formErrors.dni && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {formErrors.dni}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Selecciona un tipo de solicitud:
        <select
          name="id_tipo_solicitud"
          value={formData.id_tipo_solicitud}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.id_tipo_solicitud ? styles.inputError : ""
          }
        >
          {tiposSolicitudesOptions.map((tipoSolicitud, index) => (
            <option key={tipoSolicitud.value} value={tipoSolicitud.value}>
              {tipoSolicitud.label}
            </option>
          ))}
        </select>
        {requiredFieldsIncomplete.id_tipo_solicitud && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.id_tipo_solicitud}
          </div>
        )}
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
              onChange={operationType === "view" ? null : handleFormChange}
              readOnly={operationType === "view" ? true : false}
              className={
                requiredFieldsIncomplete.id_tipo_estado ? styles.inputError : ""
              }
            >
              {tiposEstadosOptions.map((tipoEstado, index) => (
                <option key={tipoEstado.value} value={tipoEstado.value}>
                  {tipoEstado.label}
                </option>
              ))}
            </select>
          </label>
          {requiredFieldsIncomplete.id_tipo_estado && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {requiredFieldsIncomplete.id_tipo_estado}
            </div>
          )}
        </>
      )}
      {errorMessage.length !== 0 && (
        <>
          <br /> <br />
          <p className={styles.errorMessage}>
            <ErrorIcon fontSize="medium" color="red" />
            Error: {errorMessage}
          </p>
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
