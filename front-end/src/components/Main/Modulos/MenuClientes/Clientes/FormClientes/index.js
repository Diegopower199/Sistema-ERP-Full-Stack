import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import { saveCliente, updateCliente } from "@/services/ClienteService";
import { PROVINCIAS_CON_CIUDADES } from "@/utils/provinciasConCiudades";
import {
  REGEX_EMAIL,
  REGEX_NIF_PERSONAS_FISICAS,
  REGEX_NIF_PERSONAS_JURIDICAS,
  REGEX_TELEFONO_CON_PREFIJO,
} from "@/utils/regexPatterns";
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

export default function FormClientes({
  toggleForm,
  clienteDataForm,
  formUpdateTrigger,
  cancelOrExitClickTrigger,
  operationType,
  triggerBackendOrDDBBConnectionError,
  triggerErrorMessage,
}) {
  const options = [
    { id: 1, label: "Persona Física", value: false },
    { id: 2, label: "Persona Jurídica (Empresa)", value: false },
  ];

  const [formData, setFormData] = useState({
    nif: "",
    nombre_apellidos: "",
    razon_social: "",
    numero_telefono: "34",
    correo_electronico: "",
    direccion: "",
    codigo_postal: "",
    provincia: "",
    ciudad: "",
  });

  const [selectedOptionRadio, setSelectedOptionRadio] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState({});

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
          if (clienteDataForm.nombre_apellidos !== null) {
            setSelectedOptionRadio(1);
          } else {
            setSelectedOptionRadio(2);
          }

          const infoProvincia = PROVINCIAS_CON_CIUDADES.find((provincia) => {
            return (
              provincia.provincia.toLowerCase() ===
              clienteDataForm.provincia.toLowerCase()
            );
          });
          setSelectedProvince(infoProvincia);

          setFormData(() => ({
            ...clienteDataForm,
          }));
        }
      } catch (error) {
        console.error("Ha ocurrido algo inesperado", error);
      }
    };

    fetchData();
  }, []);

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    if (!formData.nif) {
      errorMissingFields.nif = "Por favor, ingresa un nif";
    }

    if (selectedOptionRadio === 0 && operationType !== "update") {
      errorMissingFields.selectedOptionRadio =
        "Por favor, selecciona un tipo de cliente";
    } else if (!formData.nombre_apellidos && selectedOptionRadio === 1) {
      errorMissingFields.nombre_apellidos =
        "Por favor, ingresa un nombre y apellido";
    } else if (!formData.razon_social && selectedOptionRadio === 2) {
      errorMissingFields.razon_social = "Por favor, ingresa una razon social";
    }

    if (!formData.numero_telefono || formData.numero_telefono === "34") {
      errorMissingFields.numero_telefono =
        "Por favor, ingresa un numero de telefono";
    }

    if (!formData.correo_electronico) {
      errorMissingFields.correo_electronico =
        "Por favor, ingresa un correo electronico";
    }

    if (!formData.direccion) {
      errorMissingFields.direccion = "Por favor, ingresa una direccion";
    }

    if (!formData.codigo_postal) {
      errorMissingFields.codigo_postal = "Por favor, ingresa un codigo postal";
    }

    if (!formData.provincia) {
      errorMissingFields.provincia = "Por favor, ingresa una provincia";
    }

    if (!formData.ciudad) {
      errorMissingFields.ciudad = "Por favor, ingresa una ciudad";
    }

    setRequiredFieldsIncomplete(errorMissingFields);

    return Object.keys(errorMissingFields).length !== 0;
  };

  const validateFormData = () => {
    const errorForm = {};

    if (
      selectedOptionRadio === 1 &&
      !formData.nif.match(REGEX_NIF_PERSONAS_FISICAS)
    ) {
      errorForm.nif =
        "Por favor, ingresa un nif valido para una persona fisica";
    } else if (
      selectedOptionRadio === 2 &&
      !formData.nif.match(REGEX_NIF_PERSONAS_JURIDICAS)
    ) {
      errorForm.nif =
        "Por favor, ingresa un nif valido para una persona jurídica";
    }

    if (!formData.numero_telefono.match(REGEX_TELEFONO_CON_PREFIJO)) {
      errorForm.numero_telefono =
        "Por favor, ingresa un numero de telefono válido";
    }

    if (!formData.correo_electronico.match(REGEX_EMAIL)) {
      errorForm.correo_electronico = "Por favor, ingresa un email válido";
    }

    setFormErrors(errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
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
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  };

  const handleRadioSelected = (id) => {
    setSelectedOptionRadio(id);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["nombre_apellidos"]: "",
        ["razon_social"]: "",
      };
    });
  };

  const handleSelectProvinciaChange = (value, option) => {
    const infoProvincia = PROVINCIAS_CON_CIUDADES.find((provincia) => {
      return provincia.provincia.toLowerCase() === value.toLowerCase();
    });
    setSelectedProvince(infoProvincia);
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["provincia"]: value,
        ["ciudad"]: "",
      };
    });
  };

  const handleSelectCiudadChange = (value, option) => {
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        ["ciudad"]: value,
      };
    });
  };

  const handleSelectProvinciaSearch = (value) => {
    // console.log("Search provincia:", value);
  };

  const handleSelectCiudadSearch = (value) => {
    // console.log("Search ciudad:", value);
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
    if (requiredFieldsError) {
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios"
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
        const responseCreateCliente = await saveCliente(formData);

        errorHandlingInfo = checkResponseForErrors(responseCreateCliente);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseCreateCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(responseCreateCliente.errorMessage);
          return;
        }

        setErrorMessage("");
        toggleForm();
        formUpdateTrigger();
      } else if (operationType === "update") {
        const responseUpdateCliente = await updateCliente(
          formData.id,
          formData
        );

        errorHandlingInfo = checkResponseForErrors(responseUpdateCliente);

        if (errorHandlingInfo.backendError) {
          handleBackendError(responseUpdateCliente.errorMessage);
          return;
        } else if (errorHandlingInfo.backendOrDDBBConnectionError) {
          handleBackendAndDBConnectionError(responseUpdateCliente.errorMessage);
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
        {operationType === "create" && (
          <div>
            <Antd.Form.Item label="Seleccione su tipo de cliente">
              {options.map((option) => (
                <Antd.Radio
                  key={option.id}
                  checked={option.id === selectedOptionRadio}
                  onChange={() => handleRadioSelected(option.id)}
                >
                  {option.label}
                </Antd.Radio>
              ))}
              {requiredFieldsIncomplete.selectedOptionRadio && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.selectedOptionRadio}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

        <Antd.Form.Item label="NIF">
          <Antd.Input
            type="text"
            name="nif"
            value={formData.nif}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={
              requiredFieldsIncomplete.nif || formErrors.nif ? "error" : ""
            }
            className={styles.StyleInput}
          />
          {(requiredFieldsIncomplete.nif || formErrors.nif) && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.nif || formErrors.nif}
            </div>
          )}
        </Antd.Form.Item>

        {((operationType === "create" && selectedOptionRadio === 1) ||
          ((operationType === "update" || operationType === "view") &&
            formData.nombre_apellidos !== null)) && (
          <div>
            <Antd.Form.Item label="Nombre y apellidos">
              <Antd.Input
                type="text"
                name="nombre_apellidos"
                value={formData.nombre_apellidos}
                onChange={operationType === "view" ? null : handleFormChange}
                readOnly={operationType === "view" ? true : false}
                status={
                  requiredFieldsIncomplete.nombre_apellidos ? "error" : ""
                }
                className={styles.StyleInput}
              />
              {requiredFieldsIncomplete.nombre_apellidos && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.nombre_apellidos}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

        {((operationType === "create" && selectedOptionRadio === 2) ||
          ((operationType === "update" || operationType === "view") &&
            formData.razon_social !== null)) && (
          <div>
            <Antd.Form.Item label="Razon social:">
              <Antd.Input
                type="text"
                name="razon_social"
                value={formData.razon_social}
                onChange={operationType === "view" ? null : handleFormChange}
                readOnly={operationType === "view" ? true : false}
                status={requiredFieldsIncomplete.razon_social ? "error" : ""}
                className={styles.StyleInput}
              />
              {requiredFieldsIncomplete.razon_social && (
                <div className={styles.RequiredFieldsOrFormatError}>
                  {requiredFieldsIncomplete.razon_social}
                </div>
              )}
            </Antd.Form.Item>
          </div>
        )}

        <Antd.Form.Item label="Numero telefono:">
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

        <Antd.Form.Item label="Correo electronico:">
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

        <Antd.Form.Item label="Direccion:">
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

        <Antd.Form.Item label="Codigo postal:">
          <Antd.Input
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={operationType === "view" ? null : handleFormChange}
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.codigo_postal ? "error" : ""}
            className={styles.StyleInput}
          />
          {requiredFieldsIncomplete.codigo_postal && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.codigo_postal}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Provincia seleccionada">
          <Antd.Select
            name="provincia"
            value={
              formData.provincia
                ? formData.provincia
                : "Selecciona una provincia"
            }
            onChange={
              operationType === "view" ? null : handleSelectProvinciaChange
            }
            readOnly={operationType === "view" ? true : false}
            status={requiredFieldsIncomplete.provincia ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay provincia</span>}
            showSearch={true}
            onSearch={
              operationType === "view" ? null : handleSelectProvinciaSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
          >
            {operationType !== "view" &&
              PROVINCIAS_CON_CIUDADES.map((provincia, index) => (
                <Antd.Select.Option key={index} value={provincia.provincia}>
                  {provincia.provincia}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.provincia && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.provincia}
            </div>
          )}
        </Antd.Form.Item>

        <Antd.Form.Item label="Ciudad seleccionada">
          <Antd.Select
            name="ciudad"
            value={formData.ciudad ? formData.ciudad : "Selecciona una ciudad"}
            onChange={
              operationType === "view" ? null : handleSelectCiudadChange
            }
            status={requiredFieldsIncomplete.ciudad ? "error" : ""}
            className={
              operationType !== "view"
                ? styles.StyleSelect
                : styles.StyleSelectDisabled
            }
            notFoundContent={<span>No hay ciudades</span>}
            showSearch={true}
            onSearch={
              operationType === "view" ? null : handleSelectCiudadSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
            disabled={Object.keys(selectedProvince).length > 0 ? false : true}
          >
            {formData.provincia !== "" &&
              operationType !== "view" &&
              selectedProvince.ciudades.map((provinceData, index) => (
                <Antd.Select.Option key={index} value={provinceData}>
                  {provinceData}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.ciudad && (
            <div className={styles.RequiredFieldsOrFormatError}>
              {requiredFieldsIncomplete.ciudad}
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
