import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import { saveCliente, updateCliente } from "@/services/ClienteService";
import * as Antd from "antd";
import { PROVINCIAS_CON_CIUDADES } from "@/utils/provinciasConCiudades";
import {
  REGEX_EMAIL,
  REGEX_NIF_PERSONAS_FISICAS,
  REGEX_NIF_PERSONAS_JURIDICAS,
  REGEX_TELEFONO_CON_PREFIJO,
} from "@/utils/regexPatterns";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

export default function FormClientes({
  toggleForm,
  clienteDataForm,
  formUpdateTrigger,
  operationType,
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

  const [selectedProvince, setSelectedProvince] = useState({});

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedOptionRadio, setSelectedOptionRadio] = useState(0);

  const validateRequiredFields = () => {
    const errorMissingFields = {};

    console.log("formdata", formData);

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

    console.log("errorMissingFields: ", errorMissingFields);

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
    console.log("errorForm", errorForm);

    return Object.keys(errorForm).length !== 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (operationType === "update" || operationType === "view") {
          console.log("HOLA", clienteDataForm);
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
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []);

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
    console.log("ID: ", id);
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
    console.log("Search provincia:", value);
  };

  const handleSelectCiudadSearch = (value) => {
    console.log("Search ciudad:", value);
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
      console.log("Error en campos obligatorios: ", requiredFieldsError);
      setErrorMessage(
        "No se puede añadir un registro con uno o más campos vacios"
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
        const responseCreateCliente = await saveCliente(formData);
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseCreateCliente
        );

        if (responseCreateCliente.status === 409) {
          const mensajeError = responseCreateCliente.errorMessage;
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
        const responseUpdateCliente = await updateCliente(
          formData.id,
          formData
        );
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseUpdateCliente
        );

        if (responseUpdateCliente.status === 409) {
          const mensajeError = responseUpdateCliente.errorMessage;
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

  return (
    <>
      <Header />
      <Antd.Form>
        {operationType === "create" && (
          <>
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
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {requiredFieldsIncomplete.selectedOptionRadio}
                </div>
              )}
            </Antd.Form.Item>
          </>
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
          />
          {(requiredFieldsIncomplete.nif || formErrors.nif) && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {requiredFieldsIncomplete.nif || formErrors.nif}
            </div>
          )}
        </Antd.Form.Item>
        {((operationType === "create" && selectedOptionRadio === 1) ||
          ((operationType === "update" || operationType === "view") &&
            formData.nombre_apellidos !== null)) && (
          <>
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
              />
              {requiredFieldsIncomplete.nombre_apellidos && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {requiredFieldsIncomplete.nombre_apellidos}
                </div>
              )}
            </Antd.Form.Item>
          </>
        )}
        {((operationType === "create" && selectedOptionRadio === 2) ||
          ((operationType === "update" || operationType === "view") &&
            formData.razon_social !== null)) && (
          <>
            <Antd.Form.Item label="Razon social:">
              <Antd.Input
                type="text"
                name="razon_social"
                value={formData.razon_social}
                onChange={operationType === "view" ? null : handleFormChange}
                readOnly={operationType === "view" ? true : false}
                status={requiredFieldsIncomplete.razon_social ? "error" : ""}
              />
              {requiredFieldsIncomplete.razon_social && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {requiredFieldsIncomplete.razon_social}
                </div>
              )}
            </Antd.Form.Item>
          </>
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
          />
          {(requiredFieldsIncomplete.numero_telefono ||
            formErrors.numero_telefono) && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
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
          />
          {(requiredFieldsIncomplete.correo_electronico ||
            formErrors.correo_electronico) && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
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
          />
          {requiredFieldsIncomplete.direccion && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
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
          />
          {requiredFieldsIncomplete.codigo_postal && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
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
            showSearch={true}
            style={{ width: "35%" }}
            status={requiredFieldsIncomplete.provincia ? "error" : ""}
            onChange={
              operationType === "view" ? null : handleSelectProvinciaChange
            }
            onSearch={
              operationType === "view" ? null : handleSelectProvinciaSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
            notFoundContent={<span>No hay provincia</span>}
          >
            {operationType !== "view" &&
              PROVINCIAS_CON_CIUDADES.map((provincia, index) => (
                <Antd.Select.Option key={index} value={provincia.provincia}>
                  {provincia.provincia}
                </Antd.Select.Option>
              ))}
          </Antd.Select>
          {requiredFieldsIncomplete.provincia && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {requiredFieldsIncomplete.provincia}
            </div>
          )}
        </Antd.Form.Item>
        <Antd.Form.Item label="Ciudad seleccionada">
          <Antd.Select
            name="ciudad"
            value={formData.ciudad ? formData.ciudad : "Selecciona una ciudad"}
            showSearch={true}
            style={{ width: "35%" }}
            status={requiredFieldsIncomplete.ciudad ? "error" : ""}
            onChange={
              operationType === "view" ? null : handleSelectCiudadChange
            }
            onSearch={
              operationType === "view" ? null : handleSelectCiudadSearch
            }
            filterOption={
              operationType === "view" ? null : filterIncrementalSearch
            }
            notFoundContent={<span>No hay ciudades</span>}
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
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {requiredFieldsIncomplete.ciudad}
            </div>
          )}
        </Antd.Form.Item>
      </Antd.Form>
      {errorMessage.length !== 0 && (
        <>
          <p className={styles.errorMessage}>
            <ErrorIcon fontSize="medium" color="red" />
            Error: {errorMessage}
          </p>
        </>
      )}
      {(operationType === "create" || operationType === "update") && (
        <>
          <button onClick={toggleForm}>Cancelar</button>{" "}
          <button onClick={handleSubmit}>Guardar</button>
        </>
      )}
      {operationType === "view" && (
        <>
          <button onClick={toggleForm}>Salir</button>
        </>
      )}
      <Footer />
    </>
  );
}
