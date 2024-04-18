import React, { useEffect, useState } from "react";
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
import {
  savePagoFacturaCliente,
  updatePagoFacturaCliente,
} from "@/services/PagoFacturaClienteService";

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormPagosFacturasClientes({
  toggleForm,
  pagoFacturaClienteDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const importePagadoOptions = [
    {
      value: 1,
      label: "Efectivo",
    },
    {
      value: 2,
      label: "Tarjeta",
    },
  ];

  const [formData, setFormData] = useState({
    fecha_pago_realizada: "",
    importe_pagado: "",
    metodo_pago: "",
    id_factura_cliente: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (operationType === "update" || operationType === "view") {
          const fechaPagoRealizadoValida = validarFechaYYYYMMDD(
            pagoFacturaClienteDataForm.fecha_pago_realizada
          );

          if (fechaPagoRealizadoValida === null) {
            const fechaPagoRealizadoFormateada = formatearFechaYYYYMMDD(
              pagoFacturaClienteDataForm.fecha_pago_realizada
            );

            setFormData(() => ({
              ...pagoFacturaClienteDataForm,
              fecha_pago_realizada: fechaPagoRealizadoFormateada,
            }));
          } else {
            setFormData(() => ({
              ...pagoFacturaClienteDataForm,
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

    if (!formData.fecha_pago_realizada) {
      errorMissingFields.fecha_pago_realizada =
        "Por favor, ingresa la fecha del pago realizado";
    }

    if (!formData.importe_pagado) {
      errorMissingFields.importe_pagado =
        "Por favor, ingresa el importe pagado";
    }

    if (!formData.metodo_pago) {
      errorMissingFields.metodo_pago = "Por favor, ingresa el metodo de pago";
    }

    if (!formData.id_factura_cliente) {
      errorMissingFields.id_factura_cliente =
        "Por favor, ingresa el id de la factura";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    setFormErrors(errorForm);

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

  const handleSelectImportePagadoChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["metodo_pago"]: option?.children.toString(),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios "
      );
      return;
    }

    const formDataError = validateFormData();
    if (formDataError) {
      setErrorMessage("");
      return;
    }

    try {
      if (operationType === "create") {
        const responseCreatePagoFacturaCliente = await savePagoFacturaCliente(
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseCreatePagoFacturaCliente
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreatePagoFacturaCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseCreatePagoFacturaCliente.errorMessage
          );
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdatePagoFacturaCliente = await updatePagoFacturaCliente(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(
          responseUpdatePagoFacturaCliente
        );

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdatePagoFacturaCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(
            responseUpdatePagoFacturaCliente.errorMessage
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
        <Antd.Form.Item label="Fecha pago realizada">
          <Antd.Input
            type="date"
            name="fecha_pago_realizada"
            value={formData.fecha_pago_realizada}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.fecha_pago_realizada ? "error" : ""
            }
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_pago_realizada && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_pago_realizada}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Importe pagado">
          <Antd.Input
            type="number"
            name="importe_pagado"
            value={formData.importe_pagado}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.importe_pagado ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.importe_pagado && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.importe_pagado}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Método de pago">
          <Antd.Select
            name="metodo_pago"
            value={
              formData.metodo_pago
                ? formData.metodo_pago
                : "Selecciona un metodo de pago"
            }
            onChange={
              operationType === "view" ? null : handleSelectImportePagadoChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.metodo_pago ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay opciones de método de pagos</span>}
          >
            {operationType !== "view" &&
              importePagadoOptions.map((importePagar) => (
                <Antd.Select.Option
                  key={importePagar.value}
                  value={importePagar.value}
                >
                  {importePagar.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.metodo_pago && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.metodo_pago}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="ID factura cliente">
          <Antd.Input
            type="text"
            name="id_factura_cliente"
            value={formData.id_factura_cliente}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_factura_cliente ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.id_factura_cliente && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_factura_cliente}
            </div>
          )}
        </Antd.Form.Item>

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
