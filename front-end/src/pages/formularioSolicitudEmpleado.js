import { getAllTiposEstados } from "@/services/tipoEstadoService";
import { getAllTiposSolicitudes } from "@/services/tipoSolicitudService";
import React, { useEffect, useState } from "react";

function FormularioSolicitud() {
  // Obtener la fecha actual
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposSolicitudesOptions, setTiposSolicitudesOptions] = useState([]);

  const [formulario, setFormulario] = useState({
    fecha_solicitud: formattedDate,
    comentarios: "",
    tipo_solicitud: "",
    tipo_estado: "",
  });

  const fetchTiposSolicitudesOptions = async () => {
    try {
      const resultado = await getAllTiposSolicitudes();
      console.log("Resultado en fetchTiposSolicitudesOptions: ", resultado);
      if (resultado !== "Error") {
        setTiposSolicitudesOptions(resultado);
        setFormulario((prevState) => {
          return {
            ...prevState,
            ["tipo_solicitud"]: resultado[0].value.toString(),
          };
        });
      }
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  const fetchTiposEstadosOptions = async () => {
    try {
      const resultado = await getAllTiposEstados();
      console.log("Resultado: ", resultado);
      if (resultado !== "Error") {
        setTiposEstadosOptions(resultado);
        setFormulario((prevState) => {
          return {
            ...prevState,
            ["tipo_estado"]: resultado[0].value.toString(),
          };
        });
      }
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTiposEstadosOptions();
        await fetchTiposSolicitudesOptions();
      } catch (error) {
        console.error("Error en useEffect: ", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log("NAME: ", name, "\nValue: ", value);
    // Manejar cambios según el tipo de input
    setFormulario((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formulario);
    // Realizar acciones adicionales con los datos del formulario
  };

  return (
    <>
      <label>
        Selecciona un tipo de solicitud:
        <select
          name="tipo_solicitud"
          value={formulario.tipo_solicitud}
          onChange={handleChange}
        >
          {tiposSolicitudesOptions.map((tipoSolicitud, index) => (
            <option key={tipoSolicitud.value} value={tipoSolicitud.value}>
              {tipoSolicitud.label}
            </option>
          ))}
        </select>
      </label>
      <br /> <br />
      <label>
        Selecciona un tipo de estado:
        <select
          name="tipo_estado"
          value={formulario.tipo_estado}
          onChange={handleChange}
        >
          {tiposEstadosOptions.map((tipoEstado, index) => (
            <option key={tipoEstado.value} value={tipoEstado.value}>
              {tipoEstado.label}
            </option>
          ))}
        </select>
      </label>
      <br /> <br />
      <label>
        Comentarios:
        <input
          type="text"
          name="comentarios"
          value={formulario.comentarios}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <button onClick={handleSubmit}>Enviar</button>
    </>
  );
}

export default FormularioSolicitud;
