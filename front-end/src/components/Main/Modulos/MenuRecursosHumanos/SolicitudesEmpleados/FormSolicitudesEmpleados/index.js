import React, { useEffect, useState } from "react";
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

export default function FormSolicitudesEmpleados({
  toggleForm,
  solicitudEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposSolicitudesOptions, setTiposSolicitudesOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_solicitud: "",
    observacion: "",
    dni: "",
    id_tipo_solicitud: "",
    tipo_solicitud: "",
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

  const fetchTiposSolicitudesOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposSolicitudes = await getAllTiposSolicitudes();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllTiposSolicitudes
      );

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setTiposSolicitudesOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllTiposSolicitudes.errorMessage
        );
        return false;
      }

      setTiposSolicitudesOptions(responseGetAllTiposSolicitudes.data);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchTiposEstadosOptionsAndHandleErrors = async () => {
    try {
      debugger;
      const responseGetAllTiposEstados = await getAllTiposEstados();

      errorHandlingInfo = checkResponseForErrors(responseGetAllTiposEstados);

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
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
            ["tipo_estado"]:
              responseGetAllTiposEstados.data[0].label.toString(),
            ["id_tipo_estado"]:
              responseGetAllTiposEstados.data[0].value.toString(),
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
        noCallErrorsDetected =
          await fetchTiposSolicitudesOptionsAndHandleErrors();

        if (noCallErrorsDetected === false) {
          return;
        }

        noCallErrorsDetected = await fetchTiposEstadosOptionsAndHandleErrors();

        if (noCallErrorsDetected === false) {
          return;
        }

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
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.fecha_solicitud) {
      errorMissingFields.fecha_solicitud = "Por favor, ingresa una fecha";
    }

    if (!formData.dni) {
      errorMissingFields.dni = "Por favor, ingresa un dni";
    }

    if (!formData.id_tipo_solicitud) {
      errorMissingFields.id_tipo_solicitud =
        "Por favor, selecciona un tipo de solicitud";
    }

    if (operationType !== "create") {
      if (!formData.id_tipo_estado) {
        errorMissingFields.id_tipo_estado =
          "Por favor, selecciona un tipo de estado";
      }
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

  const handleTipoSolicitudChange = (value, option) => {
    console.log("El tipo persona es: ", value, option);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_solicitud"]: option?.children.toString(),
        ["id_tipo_solicitud"]: value.toString(),
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
        const responseCreateSolicitudEmpleado = await saveSolicitudEmpleado(
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseCreateSolicitudEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateSolicitudEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreateSolicitudEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateSolicitudEmpleado = await updateSolicitudEmpleado(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseUpdateSolicitudEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateSolicitudEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdateSolicitudEmpleado.errorMessage
          );
          return;
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
    <>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Fecha de solicitud">
          <Antd.Input
            type="date"
            name="fecha_solicitud"
            value={formData.fecha_solicitud}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_solicitud ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_solicitud && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_solicitud}
            </div>
          )}
        </Antd.Form.Item>

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

        <Antd.Form.Item label="Selecciona un tipo de solicitud">
          <Antd.Select
            name="tipo_solicitud"
            value={
              formData.tipo_solicitud
                ? formData.tipo_solicitud
                : "Selecciona un tipo de solicitud"
            }
            onChange={
              operationType === "view" ? null : handleTipoSolicitudChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_tipo_solicitud ? "error" : ""}
            className={styles.StyleInput}
            notFoundContent={<span>No hay opciones</span>}
          >
            {operationType !== "view" &&
              tiposSolicitudesOptions.map((tipoSolicitud) => (
                <Antd.Select.Option
                  key={tipoSolicitud.value}
                  value={tipoSolicitud.value}
                >
                  {tipoSolicitud.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_tipo_solicitud && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_tipo_solicitud}
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
    </>
  );
}
