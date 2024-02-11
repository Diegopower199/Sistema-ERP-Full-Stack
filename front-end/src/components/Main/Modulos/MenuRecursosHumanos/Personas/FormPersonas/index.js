import React, { useEffect, useState } from "react";
import { savePersona, updatePersona } from "@/services/PersonaService";
import { getAllTiposPersonas } from "@/services/TipoPersonaService";
import {
  REGEX_DATE_YYYYMMDD,
  REGEX_DNI,
  REGEX_EMAIL,
  REGEX_TELEFONO_CON_PREFIJO,
} from "@/utils/regexPatterns";
import styles from "./styles.module.css";
import ErrorIcon from "@mui/icons-material/Error";

export default function FormPersonas({
  toggleForm,
  personaDataForm,
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

  const [requiredFieldsIncomplete, setRequiredFieldsIncomplete] = useState([]);
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

  function validarFechaYYYYMMDD(fecha) {
    return fecha.match(REGEX_DATE_YYYYMMDD);
  }

  function formatearFechaAYYYYMMDD(fechaConFormatoOriginal) {
    const [dia, mes, year] = fechaConFormatoOriginal.split("-");
    const fechaFormateada = `${year}-${mes}-${dia}`;
    return fechaFormateada;
  }

  const validateRequiredFields = () => {
    const requiredFields = [
      "numero_empleado",
      "nombre",
      "apellidos",
      "genero",
      "fecha_nacimiento",
      "dni",
      "direccion",
      "numero_telefono",
      "correo_electronico",
      "id_tipo_persona",
    ];

    const missingFields = requiredFields.filter((field) => {
      return !formData[field];
    });
    setRequiredFieldsIncomplete(missingFields);

    console.log("missingFields: ", missingFields);

    return missingFields.length > 0;
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

    // Devuelve verdadero si hay errores, falso si no hay errores
    return Object.keys(errorForm).length !== 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposPersonasOptions();

        console.log("operationType: ", operationType);

        if (operationType === "update" || operationType === "view") {
          if (validarFechaYYYYMMDD(personaDataForm.fecha_nacimiento) === null) {
            const fechaFormateada = formatearFechaAYYYYMMDD(
              personaDataForm.fecha_nacimiento
            );

            console.log("fechaFormateada: ", fechaFormateada);

            setFormData(() => ({
              ...personaDataForm,
              fecha_nacimiento: fechaFormateada,
            }));
          } else {
            setFormData(() => ({
              ...personaDataForm,
            }));
          }
        }
      } catch (error) {
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "numero_telefono") {
      // Si el valor no comienza con "34", mantenlo con "34" al principio
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      // Actualiza el estado con el nuevo valor
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
    // Realizar acciones adicionales con los datos del formulario
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("numero_empleado")
              ? styles.inputError
              : ""
          }
        />
      </label>
      <br />
      <br />
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("nombre") ? styles.inputError : ""
          }
        />
      </label>
      <br />
      <br />
      <label>
        Apellidos:
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("apellidos")
              ? styles.inputError
              : ""
          }
        />
      </label>
      <br />
      <br />
      <label>
        Genero:
        <select
          name="genero"
          value={formData.genero}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("genero") ? styles.inputError : ""
          }
        >
          {generoOptions.map((genero) => (
            <option key={genero.value} value={genero.value}>
              {genero.value}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <label>
        Fecha nacimiento:
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("fecha_nacimiento")
              ? styles.inputError
              : ""
          }
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("dni") || formErrors.dni
              ? styles.inputError
              : ""
          }
        />
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("direccion")
              ? styles.inputError
              : ""
          }
        />
      </label>
      <br />
      <br />
      <label>
        Numero telefono:
        <input
          type="text"
          name="numero_telefono"
          value={formData.numero_telefono}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("numero_telefono") ||
            formErrors.numero_telefono
              ? styles.inputError
              : ""
          }
        />
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("correo_electronico") ||
            formErrors.correo_electronico
              ? styles.inputError
              : ""
          }
        />
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
          className={
            requiredFieldsIncomplete.includes("id_tipo_persona")
              ? styles.inputError
              : ""
          }
        >
          {tiposPersonasOptions.map((tipoPersona, index) => (
            <option key={tipoPersona.value} value={tipoPersona.value}>
              {tipoPersona.label}
            </option>
          ))}
        </select>
      </label>
      <br /> <br />
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
