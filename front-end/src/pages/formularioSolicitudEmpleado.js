import { getAllTiposEstados } from "@/services/TipoEstadoService";
import { getAllTiposSolicitudes } from "@/services/TipoSolicitudService";
import moment from "moment";
import React, { useEffect, useState } from "react";

function FormularioSolicitud() {
  // Obtener la fecha actual  ESTO LO DEBO HACER CON MOMENT, QUE ESTA HECHO
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
        setFormulario((prevDataState) => {
          return {
            ...prevDataState,
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
        setFormulario((prevDataState) => {
          return {
            ...prevDataState,
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
    setFormulario((prevDataState) => {
      return {
        ...prevDataState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formulario);
    // Realizar acciones adicionales con los datos del formulario
  };

  const handleFecha = (event) => {
    event.preventDefault();
    const fechaYearMesDia = moment().format("YYYY-MM-DD");
    const horaActual = moment().format("HH:mm:ss");

    const objetoParaEnviar = { fechaYearMesDia: fechaYearMesDia, horaActual: horaActual};

    console.log(objetoParaEnviar);
    // Realizar acciones adicionales con los datos del formulario
  };

  return (
    <div>
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
      <button onClick={handleSubmit}>Enviar</button> <br></br>
      <button onClick={handleFecha}>FECHA CON AÑO MES Y DIA, HORA MINUTO SEGUNDO</button>
    </div>
  );
}

export default FormularioSolicitud;
