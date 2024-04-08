import React, { useEffect, useState } from "react";
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
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import { REGEX_DNI } from "@/utils/regexPatterns";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormVacacionesEmpleados({
  toggleForm,
  vacacionEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    dias_disponibles: "0",
    dias_pendientes: "0",
    dias_solicitados: "0",
    dias_disfrutados: "0",
    observacion: "",
    dni: "",
    id_tipo_estado: "",
    tipo_estado: "",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [backendError, setBackendError] = useState(false);

  function handleBackendError(errorMessage) {
    setBackendError(true);
    setErrorMessage(errorMessage);
  }

  function handleBackendAndDBConnectionError(errorMessage) {
    triggerBackendOrDDBBConnectionError(true);
    triggerErrorMessage(errorMessage);
  }

  const fetchTiposEstadosOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposEstados = await getAllTiposEstados();

      errorHandlingInfo = checkResponseForErrors(responseGetAllTiposEstados);

      console.log("errorHandlingInfo: ", errorHandlingInfo)

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        console.log("ERROR EN EL BACK");
        handleBackendAndDBConnectionError(
          responseGetAllTiposEstados.errorMessage
        );
        return false;
      }

      setTiposEstadosOptions(responseGetAllTiposEstados.data);

      if (operationType === "create") {
        setFormData((prevDataState) => {
          return {
            ...prevDataState,
            ["tipo_estado"]: responseGetAllTiposEstados.data[0].label.toString(),
            ["id_tipo_estado"]: responseGetAllTiposEstados.data[0].value.toString(),
          };
        });
      }

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected = await fetchTiposEstadosOptionsAndHandleErrors();

        if (noCallErrorsDetected === false) {
          return;
        }

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
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

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

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleTipoEstadoChange = (value, option) => {
    console.log("El tipo persona es: ", value, option);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado"]: option?.children.toString(),
        ["id_tipo_estado"]: value.toString(),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("formData: ", formData);

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

    try {
      if (operationType === "create") {
        const responseCreateVacacion = await saveVacacionEmpleado(formData);

        errorHandlingInfo = checkResponseForErrors(responseCreateVacacion);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateVacacion.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreateVacacion.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateVacacion = await updateVacacionEmpleado(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(responseUpdateVacacion);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateVacacion.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdateVacacion.errorMessage
          );
          return;
        }

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
            observacion: responseUpdateVacacion.data.observacion,
            dni: responseUpdateVacacion.data.persona.dni,
            tipo_estado: responseUpdateVacacion.data.tipo_estado.tipo_estado,
          };

          const responseCreateBlockchainVacacionAutorizada =
            await saveTransaccionVacacionAutorizada(dataVacacionAutorizada);

          console.log(
            "responseCreateBlockchainVacacionAutorizada: ",
            responseCreateBlockchainVacacionAutorizada
          );

          console.log("ESTO TENGO QUE VERLO");
          if (responseCreateBlockchainVacacionAutorizada.status !== 200) {
            const mensajeError =
              responseCreateBlockchainVacacionAutorizada.errorMessage;
            console.log("El error es: ", mensajeError);
            setErrorMessage(mensajeError);
          }
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      }
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  return (
    <div>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Fecha inicio">
          <Antd.Input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_inicio ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_inicio && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_inicio}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha fin">
          <Antd.Input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_fin ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_fin && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_fin}
            </div>
          )}
        </Antd.Form.Item>

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Dias disponibles">
              <Antd.Input
                type="number"
                name="dias_disponibles"
                value={formData.dias_disponibles}
                readOnly={true}
                className={styles.StyleInput}
              />
            </Antd.Form.Item>
            <Antd.Form.Item label="Dias pendientes">
              <Antd.Input
                type="number"
                name="dias_pendientes"
                value={formData.dias_pendientes}
                readOnly={true}
                className={styles.StyleInput}
              />
            </Antd.Form.Item>
            <Antd.Form.Item label="Dias solicitados">
              <Antd.Input
                type="number"
                name="dias_solicitados"
                value={formData.dias_solicitados}
                readOnly={true}
                className={styles.StyleInput}
              />
            </Antd.Form.Item>
            <Antd.Form.Item label="Dias disfrutados">
              <Antd.Input
                type="number"
                name="dias_disfrutados"
                value={formData.dias_disfrutados}
                readOnly={true}
                className={styles.StyleInput}
              />
            </Antd.Form.Item>
          </div>
        )}
        <Antd.Form.Item label="Observacion">
          <Antd.Input
            type="text"
            name="observacion"
            value={formData.observacion}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            className={styles.StyleInput}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Dni persona">
          <Antd.Input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.dni || formErrors.dni ? "error" : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.dni || formErrors.dni) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.dni || formErrors.dni}
            </div>
          )}
        </Antd.Form.Item>

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Selecciona un tipo de estado">
              <Antd.Select
                name="tipo_estado"
                value={
                  formData.tipo_estado
                    ? formData.tipo_estado
                    : "Selecciona un tipo de estado"
                }
                onChange={
                  operationType === "view" ? null : handleTipoEstadoChange
                }
                readOnly={operationType === "view" ? true : false}
                status={requiredFieldsIncomplete.id_tipo_estado ? "error" : ""}
                className={styles.StyleInput}
                notFoundContent={<span>No hay opciones</span>}
              >
                {operationType !== "view" &&
                  tiposEstadosOptions.map((tipoEstado) => (
                    <Antd.Select.Option
                      key={tipoEstado.value}
                      value={tipoEstado.value}
                    >
                      {tipoEstado.label}
                    </Antd.Select.Option>
                  ))}
              </Antd.Select>
              {requiredFieldsIncomplete.id_tipo_estado && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.id_tipo_estado}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}
        {errorMessage.length !== 0 && backendError && (
          <div>
            <p className={styles.BackendError}>
              <ErrorIcon fontSize="medium" color="red" />
              Error: {errorMessage}
            </p>
          </div>
        )}
        {(operationType === "create" || operationType === "update") && (
          <div>
            <Antd.Button onClick={toggleForm}>Cancelar</Antd.Button>{" "}
            <Antd.Button onClick={handleSubmit}>Guardar</Antd.Button>
          </div>
        )}
        {operationType === "view" && (
          <div>
            <Antd.Button onClick={toggleForm}>Salir</Antd.Button>
          </div>
        )}
      </Antd.Form>
      <Footer />
    </div>
  );
}
