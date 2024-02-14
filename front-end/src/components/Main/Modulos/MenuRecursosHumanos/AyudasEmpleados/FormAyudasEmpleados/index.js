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

export default function FormAyudasEmpleados({
  toggleForm,
  ayudaEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const generoOptions = [
    {
      value: "Masculino",
    },
    {
      value: "Femenino",
    },
  ];

  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [formData, setFormData] = useState({
    numero_empleado: "",
    nombre: "",
    apellidos: "",
    genero: "Masculino",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    numero_telefono: "34",
    correo_electronico: "",
    id_tipo_persona: "1",
  });

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposPersonasOptions = async () => {
    try {
      const responseReadAllTiposPersonas = await getAllTiposPersonas();
      setTiposPersonasOptions(responseReadAllTiposPersonas);
      setFormData((prevState) => {
        return {
          ...prevState,
          ["id_tipo_persona"]: responseReadAllTiposPersonas[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

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
      errorMissingFields.genero = "Por favor, ingresa un género";
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
        "Por favor, ingresa un tipo de persona";
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
        await fetchTiposPersonasOptions();

        console.log("operationType: ", operationType);

        if (operationType === "update" || operationType === "view") {
          if (validarFechaYYYYMMDD(ayudaEmpleadoDataForm.fecha_nacimiento) === null) {
            const fechaNacimientoFormateada = formatearFechaYYYYMMDD(
              ayudaEmpleadoDataForm.fecha_nacimiento
            );

            console.log("fechaFormateada: ", fechaNacimientoFormateada);

            setFormData(() => ({
              ...ayudaEmpleadoDataForm,
              fecha_nacimiento: fechaNacimientoFormateada,
            }));
          } else {
            setFormData(() => ({
              ...ayudaEmpleadoDataForm,
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
    const { name, value, type, checked } = event.target;
    if (name === "numero_telefono") {
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      setFormData((prevFormValue) => ({
        ...prevFormValue,
        [name]: nuevoValor,
      }));
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
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
        const responseCreatePersona = await savePersona(formData);
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseCreatePersona
        );

        if (responseCreatePersona.status !== 200) {
          const mensajeError = responseCreatePersona.errorMessage;
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
        const responseUpdatePersona = await updatePersona(
          formData.id,
          formData
        );
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          responseUpdatePersona
        );

        if (responseUpdatePersona.status !== 200) {
          const mensajeError = responseUpdatePersona.errorMessage;
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
        Numero empleado:
        <input
          type="number"
          name="numero_empleado"
          value={formData.numero_empleado}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.numero_empleado ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.numero_empleado && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.numero_empleado}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={requiredFieldsIncomplete.nombre ? styles.inputError : ""}
        />
        {requiredFieldsIncomplete.nombre && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.nombre}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Apellidos:
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.apellidos ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.apellidos && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.apellidos}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Genero:
        <select
          name="genero"
          value={formData.genero}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={requiredFieldsIncomplete.genero ? styles.inputError : ""}
        >
          {generoOptions.map((genero) => (
            <option key={genero.value} value={genero.value}>
              {genero.value}
            </option>
          ))}
        </select>
        {requiredFieldsIncomplete.genero && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.genero}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Fecha nacimiento:
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.fecha_nacimiento ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.fecha_nacimiento && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.fecha_nacimiento}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Dni:
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
        Direccion:
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.direccion ? styles.inputError : ""
          }
        />
        {requiredFieldsIncomplete.direccion && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.direccion}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Numero telefono:
        <input
          type="text"
          name="numero_telefono"
          value={formData.numero_telefono}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.numero_telefono ||
            formErrors.numero_telefono
              ? styles.inputError
              : ""
          }
        />
        {requiredFieldsIncomplete.numero_telefono && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.numero_telefono}
          </div>
        )}
        {formErrors.numero_telefono && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {formErrors.numero_telefono}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Correo electronico:
        <input
          type="text"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.correo_electronico ||
            formErrors.correo_electronico
              ? styles.inputError
              : ""
          }
        />
        {requiredFieldsIncomplete.correo_electronico && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.correo_electronico}
          </div>
        )}
        {formErrors.correo_electronico && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {formErrors.correo_electronico}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Selecciona un tipo de persona:
        <select
          name="id_tipo_persona"
          value={formData.id_tipo_persona}
          onChange={operationType === "view" ? null : handleFormChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.id_tipo_persona ? styles.inputError : ""
          }
        >
          {tiposPersonasOptions.map((tipoPersona, index) => (
            <option key={tipoPersona.value} value={tipoPersona.value}>
              {tipoPersona.label}
            </option>
          ))}
        </select>
        {requiredFieldsIncomplete.id_tipo_persona && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {requiredFieldsIncomplete.id_tipo_persona}
          </div>
        )}
      </label>
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
