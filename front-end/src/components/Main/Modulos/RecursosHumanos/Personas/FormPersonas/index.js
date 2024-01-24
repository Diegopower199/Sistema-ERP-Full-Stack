import { savePersona, updatePersona } from "@/services/PersonaService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import { getAllTiposPersonas } from "@/services/TipoPersonaService";
import React, { useEffect, useState } from "react";

export default function FormPersonas({
  toggleForm,
  personaDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [generoOptions, setGeneroOptions] = useState([
    {
      value: "Masculino",
    },
    {
      value: "Femenino",
    },
  ]);

  const [formValue, setFormValue] = useState({
    numero_empleado: "",
    nombre: "",
    apellidos: "",
    genero: "Masculino",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    numero_telefono: "34",
    correo_electronico: "",
    id_tipo_persona: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposPersonasOptions = async () => {
    try {
      const resultado = await getAllTiposPersonas();
      console.log("Resultado: ", resultado);
      setTiposPersonasOptions(resultado);
      setFormValue((prevState) => {
        return {
          ...prevState,
          ["id_tipo_persona"]: resultado[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  function formatearFechaAYYYYMMDD(fechaConFormatoOriginal) {
    const [dia, mes, year] = fechaConFormatoOriginal.split("-");
    const fechaFormateada = `${year}-${mes}-${dia}`;
    return fechaFormateada;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposPersonasOptions();

        console.log("operationType: ", operationType);

        if (operationType === "update") {
          const fechaFormateada = formatearFechaAYYYYMMDD(
            personaDataForm.fecha_nacimiento
          );
          console.log("fechaFormateada: ", fechaFormateada);
          console.log("personaDataForm: ", personaDataForm);

          setFormValue(() => ({
            ...personaDataForm,
            fecha_nacimiento: fechaFormateada,
          }));
        }
      } catch (error) {
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("NAME: ", name, "\nValue: ", value);
    if (name === "numero_telefono") {
      // Si el valor no comienza con "34", mantenlo con "34" al principio
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      // Actualiza el estado con el nuevo valor
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: nuevoValor,
      }));
    } else {
      console.log("VALUE: ", value, name);
      setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errorDevueltoBack = false;
    try {
      if (operationType === "create") {
        console.log(formValue);
        const resultado = await savePersona(formValue);
        console.log("Resultado en handleSubmit: ", resultado);

        if (resultado.status !== 200) {
          const mensajeError = resultado.errorMessage;
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
        console.log(formValue);
        const resultado = await updatePersona(formValue);
        console.log("Resultado en handleSubmit: ", resultado);

        if (resultado.status !== 200) {
          const mensajeError = resultado.errorMessage;
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
          value={formValue.numero_empleado}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formValue.nombre}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Apellidos:
        <input
          type="text"
          name="apellidos"
          value={formValue.apellidos}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Genero:
        <select name="genero" value={formValue.genero} onChange={handleChange}>
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
          value={formValue.fecha_nacimiento}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Dni:
        <input
          type="text"
          name="dni"
          value={formValue.dni}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Direccion:
        <input
          type="text"
          name="direccion"
          value={formValue.direccion}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Numero telefono:
        <input
          type="text"
          name="numero_telefono"
          value={formValue.numero_telefono}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Correo electronico:
        <input
          type="text"
          name="correo_electronico"
          value={formValue.correo_electronico}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Selecciona un tipo de persona:
        <select
          name="id_tipo_persona"
          value={formValue.id_tipo_persona}
          onChange={handleChange}
        >
          {tiposPersonasOptions.map((tipoPersona, index) => (
            <option key={tipoPersona.value} value={tipoPersona.value}>
              {tipoPersona.label}
            </option>
          ))}
        </select>
      </label>
      <br /> <br />
      <button onClick={toggleForm}>Cancelar</button>{" "}
      <button onClick={handleSubmit}>Guardar</button>
    </>
  );
}
