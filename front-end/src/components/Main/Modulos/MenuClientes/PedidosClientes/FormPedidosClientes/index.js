import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import {
  fechaCumpleFormatoYYYYMMDD,
  formatearFechaYYYYMMDD,
} from "@/utils/functionsFecha";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";
import { checkResponseForErrors } from "@/utils/responseErrorChecker";
import moment from "moment";
import { getAllTiposEstadosFacturas } from "@/services/TipoEstadoFacturaService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  savePedidoCliente,
  updatePedidoCliente,
} from "@/services/PedidoClienteService";
import { getAllClientes } from "@/services/ClienteService";
import { getAllPersonasEmpleadosAndBecarios } from "@/services/PersonaService";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormPedidosClientes({
  toggleForm,
  pedidoClienteDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposEstadosFacturasOptions, setTiposEstadosFacturasOptions] =
    useState([]);
  const [clientesOptions, setClientesOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    direccion_entrega: "",
    fecha_solicitud_pedido: "",
    fecha_entrega_prevista: "",
    fecha_entrega_real: "",
    hora_inicio_desplazamiento: "",
    hora_fin_desplazamiento: "",
    tiempo_desplazamiento_total: "",
    hora_inicio_servicio: "",
    hora_fin_servicio: "",
    tiempo_servicio_total: "",
    descripcion: "",
    observacion: "",
    id_cliente: "",
    clienteInfo: "",
    id_persona: "",
    personaInfo: "",
    tipo_estado: "",
    id_tipo_estado: "",
    tipo_estado_factura: "",
    id_tipo_estado_factura: "",
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
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchTiposEstadosFacturasOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposEstadosFacturas =
        await getAllTiposEstadosFacturas();

      errorHandlingInfo = checkResponseForErrors(
        responseGetAllTiposEstadosFacturas
      );

      if (errorHandlingInfo.noContent) {
        setTiposEstadosOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllTiposEstadosFacturas.errorMessage
        );
        return false;
      }

      setTiposEstadosFacturasOptions(responseGetAllTiposEstadosFacturas.data);

      if (operationType === "create") {
        setFormData((prevDataState) => {
          return {
            ...prevDataState,
            ["tipo_estado_factura"]:
              responseGetAllTiposEstadosFacturas.data[0].label.toString(),
            ["id_tipo_estado_factura"]:
              responseGetAllTiposEstadosFacturas.data[0].value.toString(),
          };
        });
      }

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  const fetchClientesOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllClientes = await getAllClientes();

      errorHandlingInfo = checkResponseForErrors(responseGetAllClientes);

      if (errorHandlingInfo.noContent) {
        setClientesOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(responseGetAllClientes.errorMessage);
        return false;
      }

      const optionsClientes = responseGetAllClientes.data.map((cliente) => {
        const { id_cliente, nombre_apellidos, razon_social, nif } = cliente;
        const nombreOrRazonSocial = nombre_apellidos || razon_social;

        return {
          value: id_cliente,
          label: `${nombreOrRazonSocial} - ${nif}`,
        };
      });

      setClientesOptions(optionsClientes);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
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
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected = await fetchTiposEstadosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected =
          await fetchTiposEstadosFacturasOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected = await fetchClientesOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        noCallErrorsDetected =
          await fetchPersonasEmpleadosAndBecariosOptionsAndHandleErrors();

        if (!noCallErrorsDetected) {
          return;
        }

        if (operationType === "update" || operationType === "view") {
          const fechaSolivitudPedido =
            pedidoClienteDataForm.fecha_solicitud_pedido;
          const fechaEntregaPrevista =
            pedidoClienteDataForm.fecha_entrega_prevista;
          const fechaEntregaReal = pedidoClienteDataForm.fecha_entrega_real;

          const fechaSolicitudValida =
            fechaCumpleFormatoYYYYMMDD(fechaSolivitudPedido);
          const fechaEntregaPrevistaValida =
            fechaCumpleFormatoYYYYMMDD(fechaEntregaPrevista);
          const fechaEntregaRealValida =
            fechaCumpleFormatoYYYYMMDD(fechaEntregaReal);

          if (
            !fechaSolicitudValida ||
            !fechaEntregaPrevistaValida ||
            !fechaEntregaRealValida
          ) {
            let fechaSolicitudFormateada = fechaSolivitudPedido;
            if (!fechaSolicitudValida) {
              fechaSolicitudFormateada = formatearFechaYYYYMMDD(
                pedidoClienteDataForm.fecha_solicitud_pedido
              );
            }

            let fechaEntregaPrevistaFormateada = "";
            if (!fechaEntregaPrevistaValida) {
              fechaEntregaPrevistaFormateada =
                fechaEntregaPrevista !== null
                  ? formatearFechaYYYYMMDD(fechaEntregaPrevista)
                  : "";
            }

            let fechaEntregaRealFormateada = "";
            if (!fechaEntregaRealValida) {
              fechaEntregaRealFormateada =
                fechaEntregaReal !== null
                  ? formatearFechaYYYYMMDD(fechaEntregaReal)
                  : "";
            }

            setFormData(() => ({
              ...pedidoClienteDataForm,
              fecha_solicitud_pedido: fechaSolicitudFormateada,
              fecha_entrega_prevista: fechaEntregaPrevistaFormateada,
              fecha_entrega_real: fechaEntregaRealFormateada,
            }));
          } else {
            setFormData(() => ({
              ...pedidoClienteDataForm,
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

    if (!formData.direccion_entrega) {
      errorMissingFields.direccion_entrega =
        "Por favor, ingresa una dirección de entrega";
    }

    if (!formData.fecha_solicitud_pedido) {
      errorMissingFields.fecha_solicitud_pedido =
        "Por favor, ingresa la fecha de solicitud del pedido";
    }

    if (!formData.fecha_entrega_prevista) {
      errorMissingFields.fecha_entrega_prevista =
        "Por favor, ingresa la fecha de entrega prevista";
    }

    if (!formData.fecha_entrega_real) {
      errorMissingFields.fecha_entrega_real =
        "Por favor, ingresa la fecha entrega real";
    }

    if (operationType === "update") {
      if (!formData.hora_inicio_desplazamiento) {
        errorMissingFields.hora_inicio_desplazamiento =
          "Por favor, ingresa la hora de inicio del desplazamiento";
      }

      if (!formData.hora_fin_desplazamiento) {
        errorMissingFields.hora_fin_desplazamiento =
          "Por favor, ingresa la hora de fin del desplazamiento";
      }

      if (!formData.hora_inicio_servicio) {
        errorMissingFields.hora_inicio_servicio =
          "Por favor, ingresa la hora de inicio del servicio";
      }

      if (!formData.hora_fin_servicio) {
        errorMissingFields.hora_fin_servicio =
          "Por favor, ingresa la hora de fin del servicio";
      }
    }

    if (!formData.id_cliente) {
      errorMissingFields.id_cliente = "Por favor, selecciona un cliente";
    }

    if (!formData.id_persona) {
      errorMissingFields.id_persona =
        "Por favor, selecciona la persona que se encarga del pedido";
    }

    if (operationType === "update") {
      if (!formData.id_tipo_estado) {
        errorMissingFields.id_tipo_estado =
          "Por favor, selecciona un tipo de estado";
      }

      if (!formData.id_tipo_estado_factura) {
        errorMissingFields.id_tipo_estado_factura =
          "Por favor, selecciona un tipo de estado de factura";
      }
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

    const horaInicioDesplazamiento = moment(
      formData.hora_inicio_desplazamiento,
      "HH:mm:ss"
    );
    const horaFinDesplazamiento = moment(
      formData.hora_fin_desplazamiento,
      "HH:mm:ss"
    );
    const horaInicioServicio = moment(
      formData.hora_inicio_servicio,
      "HH:mm:ss"
    );
    const horaFinServicio = moment(formData.hora_fin_servicio, "HH:mm:ss");

    if (horaInicioServicio.isBefore(horaInicioDesplazamiento)) {
      logicalErrors.hora_inicio_servicio =
        "La hora de inicio del servicio no puede ser antes que la hora inicio del desplazamiento";
    }

    if (horaFinServicio.isBefore(horaInicioServicio)) {
      logicalErrors.hora_fin_servicio =
        "La hora fin del servicio no puede ser antes que la hora inicio del servicio";
    }

    if (horaFinDesplazamiento.isBefore(horaFinServicio)) {
      logicalErrors.hora_fin_desplazamiento =
        "La hora de fin de desplazamiento no puede ser antes que la hora fin del servicio";
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

  const handleTimeChange = (time, timeString, name) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: timeString,
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

  const handleTipoEstadoFacturaChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado_factura"]: option?.children.toString(),
        ["id_tipo_estado_factura"]: value.toString(),
      };
    });
  };

  const handleSelectClienteChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["id_cliente"]: value.toString(),
        ["clienteInfo"]: option?.children.toString(),
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

  const handleSelectClienteSearch = (value) => {
    // console.log("Search cliente:", value);
  };

  const handleSelectPersonaSearch = (value) => {
    // console.log("Search persona:", value);
  };

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
        const responseCreatePedidoCliente = await savePedidoCliente(formData);

        errorHandlingInfo = checkResponseForErrors(responseCreatePedidoCliente);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreatePedidoCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreatePedidoCliente.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdatePedidoCliente = await updatePedidoCliente(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(responseUpdatePedidoCliente);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdatePedidoCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdatePedidoCliente.errorMessage
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
    <div>
      <Header />
      <Antd.Form>
        <Antd.Form.Item label="Dirección entrega">
          <Antd.Input
            type="text"
            name="direccion_entrega"
            value={formData.direccion_entrega}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.direccion_entrega ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.direccion_entrega && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.direccion_entrega}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha solicitud pedido">
          <Antd.Input
            type="date"
            name="fecha_solicitud_pedido"
            value={formData.fecha_solicitud_pedido}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.fecha_solicitud_pedido ? "error" : ""
            }
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_solicitud_pedido && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_solicitud_pedido}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha entrega prevista">
          <Antd.Input
            type="date"
            name="fecha_entrega_prevista"
            value={formData.fecha_entrega_prevista}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.fecha_entrega_prevista ? "error" : ""
            }
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_entrega_prevista && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_entrega_prevista}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Fecha entrega real">
          <Antd.Input
            type="date"
            name="fecha_entrega_real"
            value={formData.fecha_entrega_real}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_entrega_real ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_entrega_real && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_entrega_real}
            </div>
          )}
        </Antd.Form.Item>

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Hora inicio desplazamiento">
              <Antd.TimePicker
                name="hora_inicio_desplazamiento"
                value={
                  formData.hora_inicio_desplazamiento
                    ? moment(formData.hora_inicio_desplazamiento, "HH:mm")
                    : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(
                    time,
                    timeString,
                    "hora_inicio_desplazamiento"
                  )
                }
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.hora_inicio_desplazamiento
                    ? "error"
                    : ""
                }
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
                disabled={
                  formData.tipo_estado !== "Aprobado" &&
                  operationType !== "view"
                    ? true
                    : false
                }
              />
              {requiredFieldsIncomplete.hora_inicio_desplazamiento && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.hora_inicio_desplazamiento}
                </div>
              )}
            </Antd.Form.Item>

            <Antd.Form.Item label="Hora fin desplazamiento">
              <Antd.TimePicker
                name="hora_fin_desplazamiento"
                value={
                  formData.hora_fin_desplazamiento
                    ? moment(formData.hora_fin_desplazamiento, "HH:mm")
                    : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(time, timeString, "hora_fin_desplazamiento")
                }
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.hora_fin_desplazamiento ||
                  logicalDataErrors.hora_fin_desplazamiento
                    ? "error"
                    : ""
                }
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
                disabled={
                  formData.tipo_estado !== "Aprobado" &&
                  operationType !== "view"
                    ? true
                    : false
                }
              />
              {(requiredFieldsIncomplete.hora_fin_desplazamiento ||
                logicalDataErrors.hora_fin_desplazamiento) && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.hora_fin_desplazamiento ||
                    logicalDataErrors.hora_fin_desplazamiento}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

        {operationType === "view" && (
          <div>
            <Antd.Form.Item label="Tiempo desplazamiento total">
              <Antd.TimePicker
                name="hora_fin_desplazamiento"
                value={
                  formData.hora_fin_desplazamiento
                    ? moment(formData.hora_fin_desplazamiento, "HH:mm")
                    : null
                }
                readOnly={true}
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
              />
            </Antd.Form.Item>
          </div>
        )}

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Hora inicio servicio">
              <Antd.TimePicker
                name="hora_inicio_servicio"
                value={
                  formData.hora_inicio_servicio
                    ? moment(formData.hora_inicio_servicio, "HH:mm")
                    : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(time, timeString, "hora_inicio_servicio")
                }
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.hora_inicio_servicio ||
                  logicalDataErrors.hora_inicio_servicio
                    ? "error"
                    : ""
                }
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
                disabled={
                  formData.tipo_estado !== "Aprobado" &&
                  operationType !== "view"
                    ? true
                    : false
                }
              />
              {(requiredFieldsIncomplete.hora_inicio_servicio ||
                logicalDataErrors.hora_inicio_servicio) && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.hora_inicio_servicio ||
                    logicalDataErrors.hora_inicio_servicio}
                </div>
              )}
            </Antd.Form.Item>

            <Antd.Form.Item label="Hora fin servicio">
              <Antd.TimePicker
                name="hora_fin_servicio"
                value={
                  formData.hora_fin_servicio
                    ? moment(formData.hora_fin_servicio, "HH:mm")
                    : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(time, timeString, "hora_fin_servicio")
                }
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.hora_fin_servicio ||
                  logicalDataErrors.hora_fin_servicio
                    ? "error"
                    : ""
                }
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
                disabled={
                  formData.tipo_estado !== "Aprobado" &&
                  operationType !== "view"
                    ? true
                    : false
                }
              />
              {(requiredFieldsIncomplete.hora_fin_servicio ||
                logicalDataErrors.hora_fin_servicio) && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.hora_fin_servicio ||
                    logicalDataErrors.hora_fin_servicio}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

        {operationType === "view" && (
          <div>
            <Antd.Form.Item label="Tiempo servicio total">
              <Antd.TimePicker
                name="tiempo_servicio_total"
                value={
                  formData.tiempo_servicio_total
                    ? moment(formData.tiempo_servicio_total, "HH:mm")
                    : null
                }
                readOnly={true}
                className={
                  operationType !== "view"
                    ? styles.StyleTimePicker
                    : styles.StyleTimePickerDisabled
                }
                format="HH:mm"
              />
            </Antd.Form.Item>
          </div>
        )}

        <Antd.Form.Item label="Descripción">
          <Antd.Input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            className={styles.StyleInput}
          />
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

        <Antd.Form.Item label="Selecciona un cliente">
          <Antd.Select
            name="clienteInfo"
            value={
              formData.clienteInfo
                ? formData.clienteInfo
                : "Selecciona un cliente"
            }
            onChange={
              operationType === "view" ? null : handleSelectClienteChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_cliente ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay clientes disponibles</span>}
            showSearch={true}
            onSearch={
              operationType === "view" ? null : handleSelectClienteSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
          >
            {operationType !== "view" &&
              clientesOptions.map((cliente) => (
                <Antd.Select.Option key={cliente.value} value={cliente.value}>
                  {cliente.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_cliente && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_cliente}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Selecciona una persona que se encargue del pedido">
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

        {(operationType === "update" || operationType === "view") && (
          <div>
            <Antd.Form.Item label="Selecciona un tipo de estado de factura">
              <Antd.Select
                name="tipo_estado_factura"
                value={
                  formData.tipo_estado_factura
                    ? formData.tipo_estado_factura
                    : "Selecciona un tipo de estado de factura"
                }
                onChange={
                  operationType === "view"
                    ? null
                    : handleTipoEstadoFacturaChange
                }
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.id_tipo_estado_factura ? "error" : ""
                }
                className={
                  operationType !== "view"
                    ? styles.StyleSelect
                    : styles.StyleSelectDisabled
                }
                notFoundContent={
                  <span>No hay tipos de estados de factura disponibles</span>
                }
              >
                {operationType !== "view" &&
                  tiposEstadosFacturasOptions.map((tipoEstadoFactura) => (
                    <Antd.Select.Option
                      key={tipoEstadoFactura.value}
                      value={tipoEstadoFactura.value}
                    >
                      {tipoEstadoFactura.label}
                    </Antd.Select.Option>
                  ))}
              </Antd.Select>
              {requiredFieldsIncomplete.id_tipo_estado_factura && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.id_tipo_estado_factura}
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
