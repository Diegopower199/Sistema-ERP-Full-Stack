import React, { useEffect, useState } from "react";
import { regexDateYYYMMDD } from "@/utils/regexPatterns";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
import {
  saveVacacionEmpleado,
  updateVacacionEmpleado,
} from "@/services/VacacionEmpleadoService";
import moment from "moment";

export default function FormVacacionesEmpleados({
  toggleForm,
  vacacionEmpleadoDataForm,
  formUpdateTrigger,
  operationType,
}) {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  const [formValue, setFormValue] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    dias_solicitados: "0",
    dias_disfrutados: "0",
    dias_restantes: "0",
    comentarios: "",
    dni: "",
    id_tipo_estado: "1",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const fetchTiposEstadosOptions = async () => {
    try {
      const resultado = await getAllTiposEstados();
      setTiposEstadosOptions(resultado);
      setFormValue((prevState) => {
        return {
          ...prevState,
          ["id_tipo_estado"]: resultado[0].value.toString(),
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  function validarFechaYYYYMMDD(fecha) {
    return fecha.match(regexDateYYYMMDD);
  }

  function formatearFechaAYYYYMMDD(fechaConFormatoOriginal) {
    const [dia, mes, year] = fechaConFormatoOriginal.split("-");
    const fechaFormateada = `${year}-${mes}-${dia}`;
    return fechaFormateada;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposEstadosOptions();

        console.log("operationType: ", operationType, vacacionEmpleadoDataForm);

        if (operationType === "update" || operationType === "view") {
          setFormValue(() => ({
            ...vacacionEmpleadoDataForm,
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
    if (name === "numero_telefono") {
      // Si el valor no comienza con "34", mantenlo con "34" al principio
      const nuevoValor = value.startsWith("34") ? value : "34" + value;

      // Actualiza el estado con el nuevo valor
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: nuevoValor,
      }));
    } else {
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
        const resultado = await saveVacacionEmpleado(formValue);
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          resultado
        );

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
        const resultado = await updateVacacionEmpleado(formValue.id, formValue);
        console.log(
          `Resultado en handleSubmit en ${operationType} : `,
          resultado
        );

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
  };

  // https://es.stackoverflow.com/questions/289413/bloquear-n%C3%BAmeros-letras-y-o-caracteres-especiales-en-un-input MIRARME ESTO

  return (
    <>
      <label>
        Fecha inicio:
        <input
          type="date"
          name="fecha_inicio"
          value={formValue.fecha_inicio}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      <br />
      <br />
      <label>
        Fecha fin:
        <input
          type="date"
          name="fecha_fin"
          value={formValue.fecha_fin}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Dias solicitados:
            <input
              type="number"
              name="dias_solicitados"
              value={formValue.dias_solicitados}
              readOnly={true}
            />
          </label>
          <br />
          <br />
          <label>
            Dias disfrutados:
            <input
              type="number"
              name="dias_disfrutados"
              value={formValue.dias_disfrutados}
              readOnly={true}
            />
          </label>
          <br />
          <br />
          <label>
            Dias restantes:
            <input
              type="number"
              name="dias_restantes"
              value={formValue.dias_restantes}
              readOnly={true}
            />
          </label>
        </>
      )}
      <br />
      <br />
      <label>
        Comentarios:
        <input
          type="text"
          name="comentarios"
          value={formValue.comentarios}
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
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
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Selecciona un tipo de estado:
            <select
              name="id_tipo_estado"
              value={formValue.id_tipo_estado}
              onChange={operationType === "view" ? null : handleChange}
              readOnly={operationType === "view" ? true : false}
            >
              {tiposEstadosOptions.map((tipoEstado, index) => (
                <option key={tipoEstado.value} value={tipoEstado.value}>
                  {tipoEstado.label}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <br /> <br />
      <button onClick={toggleForm}>Cancelar</button>{" "}
      <button onClick={handleSubmit}>Guardar</button>
    </>
  );
}
