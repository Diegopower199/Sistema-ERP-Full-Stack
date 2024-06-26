import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import {
  saveBajaLaboralEmpleado,
  updateBajaLaboralEmpleado,
} from "@/services/BajaLaboralEmpleadoService";
import { getAllMotivosBajas } from "@/services/MotivoBajaService";
import { getAllPersonasEmpleadosAndBecarios } from "@/services/PersonaService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  formatearFechaYYYYMMDD,
  validarFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import ErrorIcon from "@mui/icons-material/Error";
import * as Antd from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormBajasLaboralesEmpleados({
  toggleForm,
  bajaLaboralEmpleadoDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [motivosBajasOptions, setMotivosBajasOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    observacion: "",
    id_persona: "",
    personaInfo: "",
    motivo_baja: "",
    id_motivo_baja: "",
    tipo_estado: "",
    id_tipo_estado: "",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [logicalDataErrors, setLogicalDataErrors] = useState({});
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

      if (errorHandlingInfo.noContent) {
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
    } catch (error) {}
  };

  const fetchMotivosBajasOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllMotivosBajas = await getAllMotivosBajas();

      errorHandlingInfo = checkResponseForErrors(responseGetAllMotivosBajas);

      if (errorHandlingInfo.noContent) {
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllMotivosBajas.errorMessage
        );
        return false;
      }

      setMotivosBajasOptions(responseGetAllMotivosBajas.data);

      return true;
    } catch (error) {}
  };

  const fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllPersonasEmpleadosAndBecarios =
        await getAllPersonasEmpleadosAndBecarios();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllPersonasEmpleadosAndBecarios
      );

      if (errorHandlingInfo.noContent) {
        setPersonasOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllPersonasEmpleadosAndBecarios.errorMessage
        );
        return false;
      }

      const optionsPersonas =
        responseGetAllPersonasEmpleadosAndBecarios.data.map((persona) => {
          const { id_persona, nombre, apellidos, dni } = persona;

          return {
            value: id_persona,
            label: `${nombre + " " + apellidos} - ${dni}`,
          };
        });

      setPersonasOptions(optionsPersonas);

      return true;
    } catch (error) {}
  };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected = await fetchTiposEstadosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected = await fetchMotivosBajasOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected =
          await fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        if (operationType === "update" || operationType === "view") {
          const fechaInicioValida = validarFechaYYYYMMDD(
            bajaLaboralEmpleadoDataForm.fecha_inicio
          );

          const fechaFinValida = validarFechaYYYYMMDD(
            bajaLaboralEmpleadoDataForm.fecha_fin
          );

          if (fechaInicioValida === null || fechaFinValida === null) {
            const fechaInicioFormateada = formatearFechaYYYYMMDD(
              bajaLaboralEmpleadoDataForm.fecha_inicio
            );

            const fechaFinFormateada = formatearFechaYYYYMMDD(
              bajaLaboralEmpleadoDataForm.fecha_fin
            );

            setFormData(() => ({
              ...bajaLaboralEmpleadoDataForm,
              fecha_inicio: fechaInicioFormateada,
              fecha_fin: fechaFinFormateada,
            }));
          } else {
            setFormData(() => ({
              ...bajaLaboralEmpleadoDataForm,
            }));
          }
        }
      } catch (error) {}
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

    if (!formData.id_persona) {
      errorMissingFields.id_persona = "Por favor, selecciona una persona";
    }

    if (!formData.id_motivo_baja) {
      errorMissingFields.id_motivo_baja =
        "Por favor, ingresa un motivo de baja";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    setFormErrors(errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  const validateLogicalData = () => {
    const logicalErrors = {};

    const fechaInicio = moment(formData.fecha_inicio);
    const fechaFin = moment(formData.fecha_fin);

    if (fechaFin.isBefore(fechaInicio)) {
      logicalErrors.fecha_fin =
        "La fecha de fin no puede ser anterior a la fecha de inicio";
    }

    setLogicalDataErrors(logicalErrors);

    return Object.keys(logicalErrors).length !== 0;
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
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado"]: option?.children.toString(),
        ["id_tipo_estado"]: value.toString(),
      };
    });
  };

  const handleMotivoBajaChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["motivo_baja"]: option?.children.toString(),
        ["id_motivo_baja"]: value.toString(),
      };
    });
  };

  const handleSelectPersonaChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["id_persona"]: value.toString(),
        ["personaInfo"]: option?.children.toString(),
      };
    });
  };

  const handleSelectPersonaSearch = (value) => {};

  const filterIncrementalSearch = (input, option) => {
    const optionLabel = option?.children.toLowerCase();

    const userInput = input.toLowerCase();

    const isOptionIncluded = optionLabel.includes(userInput);

    return isOptionIncluded;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFieldsError = validateRequiredFields();
    const formDataError = validateFormData();
    const logicalDataError = validateLogicalData();

    if (requiredFieldsError || formDataError || logicalDataError) {
      return;
    }

    try {
      if (operationType === "create") {
        const responseCreateBajaLaboralEmpleado = await saveBajaLaboralEmpleado(
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseCreateBajaLaboralEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateBajaLaboralEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreateBajaLaboralEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateBajaLaboralEmpleado =
          await updateBajaLaboralEmpleado(formData.id, formData);

        errorHandlingInfo = checkResponseForErrors(
          responseUpdateBajaLaboralEmpleado
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateBajaLaboralEmpleado.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdateBajaLaboralEmpleado.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      }
    } catch (error) {}
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
            status={
              requiredFieldsIncomplete.fecha_fin || logicalDataErrors.fecha_fin
                ? "error"
                : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.fecha_fin ||
            logicalDataErrors.fecha_fin) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_fin ||
                logicalDataErrors.fecha_fin}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Observación">
          <Antd.Input
            type="text"
            name="observacion"
            value={formData.observacion}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            className={styles.StyleInput}
          />
        </Antd.Form.Item>

        <Antd.Form.Item label="Selecciona una persona">
          <Antd.Select
            name="personaInfo"
            value={
              formData.personaInfo
                ? formData.personaInfo
                : "Selecciona un persona"
            }
            onChange={
              operationType === "view" ? null : handleSelectPersonaChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_persona ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay personas disponibles</span>}
            showSearch={true}
            onSearch={
              operationType === "view" ? null : handleSelectPersonaSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
          >
            {operationType !== "view" &&
              personasOptions.map((persona) => (
                <Antd.Select.Option key={persona.value} value={persona.value}>
                  {persona.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_persona && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_persona}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Selecciona un motivo de baja">
          <Antd.Select
            name="motivo_baja"
            value={
              formData.motivo_baja
                ? formData.motivo_baja
                : "Selecciona un motivo de baja"
            }
            onChange={operationType === "view" ? null : handleMotivoBajaChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_motivo_baja ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay motivos de bajas disponibles</span>}
          >
            {operationType !== "view" &&
              motivosBajasOptions.map((motivoBaja) => (
                <Antd.Select.Option
                  key={motivoBaja.value}
                  value={motivoBaja.value}
                >
                  {motivoBaja.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_motivo_baja && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_motivo_baja}
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
                className={
                  operationType !== "view"
                    ? styles.StyleSelect
                    : styles.StyleSelectDisabled
                }
                notFoundContent={
                  <span>No hay tipos de estados disponibles</span>
                }
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
            <Antd.Button
              onClick={() => {
                toggleForm();
                cancelOrExitClickTrigger();
              }}
            >
              Cancelar
            </Antd.Button>{" "}
            <Antd.Button onClick={handleSubmit}>Guardar</Antd.Button>
          </div>
        )}
        {operationType === "view" && (
          <div>
            <Antd.Button
              onClick={() => {
                toggleForm();
                cancelOrExitClickTrigger();
              }}
            >
              Salir
            </Antd.Button>
          </div>
        )}
      </Antd.Form>
      <Footer />
    </div>
  );
}
