import { getAllTiposEstados } from "@/services/TipoEstadoService";
import * as antd from "antd";
import React, { useEffect, useState } from "react";

function FormularioVacacionEmpleado() {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  const [formulario, setFormulario] = useState({
    year: "",
    tipo_estado: "",
    fecha_inicio: "",
    fecha_finalizacion: "",
  });

  const fetchTiposEstadosOptions = async () => {
    try {
      const resultado = await getAllTiposEstados();
      console.log("Resultado: ", resultado);
      setTiposEstadosOptions(resultado);
      /*setFormulario((prevState) => {
        return {
          ...prevState,
          ["tipo_estado"]: resultado[0].value.toString(),
        };
      });*/
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchTiposEstadosOptions();
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
        Fecha de inicio:
        <input
          type="date"
          name="fecha_inicio"
          value={formulario.fecha_inicio}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Fecha de fin:
        <input
          type="date"
          name="fecha_finalizacion"
          value={formulario.fecha_finalizacion}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Selecciona un tipo de estado:
        <antd.Select
          name="tipo_estado"
          //value={formulario.tipo_estado}
          defaultValue={formulario.tipo_estado ? formulario.tipo_estado : "Selecciona un tipo de estado"}
          onChange={() => {
            setFormulario((prevState) => {
              return {
                ...prevState,
                ["tipo_estado"]: "2",
              };
            });
          }}
        >
          {tiposEstadosOptions.map((tipoEstado, index) => (
            <antd.Select.Option key={tipoEstado.value} value={tipoEstado.value}>
              {tipoEstado.label}
            </antd.Select.Option>
          ))}
        </antd.Select>
      </label>
      <br /> <br />
      <button onClick={handleSubmit}>Enviar</button>
    </>
  );
}

export default FormularioVacacionEmpleado;
