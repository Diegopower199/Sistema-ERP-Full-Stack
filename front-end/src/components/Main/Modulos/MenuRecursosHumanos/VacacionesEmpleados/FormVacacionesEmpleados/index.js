import React, { useEffect, useState } from "react";
import { REGEX_DNI } from "@/utils/regexPatterns";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  saveVacacionEmpleado,
  updateVacacionEmpleado,
} from "@/services/VacacionEmpleadoService";
import { saveTransaccionVacacionAutorizada } from "@/services/BlockchainVacacionAutorizadaService";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";

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

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});

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

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.fecha_inicio) {
      errorMissingFields.fecha_inicio =
        "Por favor, selecciona una fecha de inicio";
    }

    if (!formData.fecha_fin) {
      errorMissingFields.fecha_fin = "Por favor, selecciona una fecha de fin";
    }

    if (!formData.dni) {
      errorMissingFields.dni = "Por favor, ingresa un DNI";
    }

    if (!formData.id_tipo_estado) {
      errorMissingFields.id_tipo_estado =
        "Por favor, ingresa un tipo de estado";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    console.log("errorMissingFields: ", errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    if (!formData.dni.match(REGEX_DNI)) {
      errorForm.dni = "Por favor, ingresa un DNI válido";
    }

    setFormErrors(errorForm);
    console.log("errorForm", errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposEstadosOptions();

        console.log("operationType: ", operationType, vacacionEmpleadoDataForm);

        if (operationType === "update" || operationType === "view") {
          if (
            validarFechaYYYYMMDD(vacacionEmpleadoDataForm.fecha_inicio) ===
              null ||
            validarFechaYYYYMMDD(vacacionEmpleadoDataForm.fecha_fin) === null
          ) {
            const fechaInicioFormateada = formatearFechaYYYYMMDD(
              vacacionEmpleadoDataForm.fecha_inicio
            );

            const fechaFinFormateada = formatearFechaYYYYMMDD(
              vacacionEmpleadoDataForm.fecha_fin
            );

            console.log("fechaInicioFormateada: ", fechaInicioFormateada);
            console.log("fechaFinFormateada: ", fechaFinFormateada);

            setFormData(() => ({
              ...vacacionEmpleadoDataForm,
              fecha_inicio: fechaInicioFormateada,
              fecha_fin: fechaFinFormateada,
            }));
          } else {
            setFormData(() => ({
              ...vacacionEmpleadoDataForm,
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

    setFormData((prevState) => {
      return {
        ...prevState,
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
      <label>
        Fecha inicio:
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          placeholder="Fecha inicio"
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.fecha_inicio ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.fecha_inicio && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.fecha_inicio}
          </div>
        )}
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
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.fecha_fin ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.fecha_fin && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.fecha_fin}
          </div>
        )}
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
          onChange={operationType === "view" ? null : handleFormChange}
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
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={requiredFieldsIncomplete.dni ? styles.inputError : ""}
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
