import React, { useEffect, useState } from "react";
import { savePersona, updatePersona } from "@/services/PersonaService";
import { getAllTiposPersonas } from "@/services/TipoPersonaService";
import {
  REGEX_DNI,
  REGEX_EMAIL,
  REGEX_TELEFONO_CON_PREFIJO,
} from "@/utils/regexPatterns";
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

let errorHandlingInfo = {
  errorMessage: "",
  backendOrDDBBConnectionError: false,
  backendError: false,
  noContent: false,
};

export default function FormAsistenciasEmpleados({
  toggleForm,
  asistenciaEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const generoOptions = [
    {
      value: 1,
      label: "Masculino",
    },
    {
      value: 2,
      label: "Femenino",
    },
  ];

  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    numero_empleado: "",
    nombre: "",
    apellidos: "",
    genero: "",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    numero_telefono: "34",
    correo_electronico: "",
    id_tipo_persona: "",
    tipo_persona: "",
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

  const fetchTiposPersonasOptionsAndHandleErrors = async () => {
    try {
      const responseGetAllTiposPersonas = await getAllTiposPersonas();

      errorHandlingInfo = checkResponseForErrors(responseGetAllTiposPersonas);

      if (errorHandlingInfo.noContent) {
        console.log("No hay contenido disponible");
        setTiposPersonasOptions([]);
        return false;
      }

      if (errorHandlingInfo.backendOrDDBBConnectionError) {
        handleBackendAndDBConnectionError(
          responseGetAllTiposPersonas.errorMessage
        );
        return false;
      }

      setTiposPersonasOptions(responseGetAllTiposPersonas.data);

      return true;
    } catch (error) {
      console.error("Ha ocurrido algo inesperado", error);
    }
  };

  useEffect(() => {
    let noCallErrorsDetected = false;

    const fetchData = async () => {
      try {
        noCallErrorsDetected = await fetchTiposPersonasOptionsAndHandleErrors();

        if (noCallErrorsDetected === false) {
          return;
        }

        console.log("operationType: ", operationType);

        if (operationType === "update" || operationType === "view") {
          if (validarFechaYYYYMMDD(asistenciaEmpleadoDataForm.fecha_nacimiento) === null) {
            const fechaNacimientoFormateada = formatearFechaYYYYMMDD(
              asistenciaEmpleadoDataForm.fecha_nacimiento
            );

            console.log("fechaFormateada: ", fechaNacimientoFormateada);

            setFormData(() => ({
              ...asistenciaEmpleadoDataForm,
              fecha_nacimiento: fechaNacimientoFormateada,
            }));
          } else {
            setFormData(() => ({
              ...asistenciaEmpleadoDataForm,
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

    if (!formData.numero_empleado) {
      errorMissingFields.numero_empleado =
        "Por favor, ingresa un numero empleado";
    }

    if (!formData.nombre) {
      errorMissingFields.nombre = "Por favor, ingresa un nombre";
    }

    if (!formData.apellidos) {
      errorMissingFields.apellidos = "Por favor, ingresa un apellido";
    }

    if (!formData.genero) {
      errorMissingFields.genero = "Por favor, selecciona un género";
    }

    if (!formData.fecha_nacimiento) {
      errorMissingFields.fecha_nacimiento =
        "Por favor, selecciona una fecha de nacimiento";
    }

    if (!formData.dni) {
      errorMissingFields.dni = "Por favor, ingresa un DNI";
    }

    if (!formData.direccion) {
      errorMissingFields.direccion = "Por favor, ingresa una direccion";
    }

    if (!formData.numero_telefono || formData.numero_telefono === "34") {
      errorMissingFields.numero_telefono =
        "Por favor, ingresa un numero de telefono";
    }

    if (!formData.correo_electronico) {
      errorMissingFields.correo_electronico =
        "Por favor, ingresa un correo electronico";
    }

    if (!formData.id_tipo_persona) {
      errorMissingFields.id_tipo_persona =
        "Por favor, selecciona un tipo de persona";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    if (!formData.dni.match(REGEX_DNI)) {
      errorForm.dni = "Por favor, ingresa un DNI válido";
    }

    if (!formData.numero_telefono.match(REGEX_TELEFONO_CON_PREFIJO)) {
      errorForm.numero_telefono =
        "Por favor, ingresa un numero de telefono válido";
    }

    if (!formData.correo_electronico.match(REGEX_EMAIL)) {
      errorForm.correo_electronico = "Por favor, ingresa un email válido";
    }

    setFormErrors(errorForm);
    console.log("errorForm: ", errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("Name: ", name, " Value: ", value);
    if (name === "numero_telefono") {
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      setFormData((prevFormValue) => ({
        ...prevFormValue,
        [name]: nuevoValor,
      }));
    } else {
      setFormData((prevDataState) => {
        return {
          ...prevDataState,
          [name]: value,
        };
      });
    }
  };

  const handleSelectGeneroChange = (value, option) => {
    console.log("El genero es: ", value, option);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["genero"]: option?.children.toString(),
      };
    });
  };

  const handleTipoPersonaChange = (value, option) => {
    console.log("El tipo persona es: ", value, option);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_persona"]: option?.children.toString(),
        ["id_tipo_persona"]: value.toString(),
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
        const responseCreatePersona = await savePersona(formData);

        errorHandlingInfo = checkResponseForErrors(responseCreatePersona);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreatePersona.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(responseCreatePersona.errorMessage);
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdatePersona = await updatePersona(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(responseUpdatePersona);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdatePersona.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(responseUpdatePersona.errorMessage);
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
        <Antd.Form.Item label="Numero empleado">
          <Antd.Input
            type="number"
            name="numero_empleado"
            value={formData.numero_empleado}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.numero_empleado ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.numero_empleado && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.numero_empleado}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Nombre">
          <Antd.Input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.nombre ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.nombre && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.nombre}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Apellidos">
          <Antd.Input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.apellidos ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.apellidos && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.apellidos}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Genero">
          <Antd.Select
            name="genero"
            value={formData.genero ? formData.genero : "Selecciona un género"}
            onChange={
              operationType === "view" ? null : handleSelectGeneroChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.genero ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay géneros</span>}
          >
            {operationType !== "view" &&
              generoOptions.map((genero) => (
                <Antd.Select.Option key={genero.value} value={genero.value}>
                  {genero.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.genero && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.genero}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label=" Fecha nacimiento">
          <Antd.Input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.fecha_nacimiento ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.fecha_nacimiento && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.fecha_nacimiento}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Dni">
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
        <Antd.Form.Item label="Direccion">
          <Antd.Input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.direccion ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.direccion && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.direccion}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Numero telefono">
          <Antd.Input
            type="text"
            name="numero_telefono"
            value={formData.numero_telefono}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.numero_telefono ||
              formErrors.numero_telefono
                ? "error"
                : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.numero_telefono ||
            formErrors.numero_telefono) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.numero_telefono ||
                formErrors.numero_telefono}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Correo electronico">
          <Antd.Input
            type="text"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.correo_electronico ||
              formErrors.correo_electronico
                ? "error"
                : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.correo_electronico ||
            formErrors.correo_electronico) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.correo_electronico ||
                formErrors.correo_electronico}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Selecciona un tipo de persona">
          <Antd.Select
            name="tipo_persona"
            value={
              formData.tipo_persona
                ? formData.tipo_persona
                : "Selecciona un tipo de persona"
            }
            onChange={operationType === "view" ? null : handleTipoPersonaChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.id_tipo_persona ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay opciones</span>}
          >
            {operationType !== "view" &&
              tiposPersonasOptions.map((tipoPersona) => (
                <Antd.Select.Option
                  key={tipoPersona.value}
                  value={tipoPersona.value}
                >
                  {tipoPersona.label}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.id_tipo_persona && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.id_tipo_persona}
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
