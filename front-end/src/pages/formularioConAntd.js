import { getAllTiposEstados } from "@/services/TipoEstadoService";
//import antd, { Button, Select } from "antd";
import * as Antd from "antd";
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

  const handleFormChange = (event) => {
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

  const handleDateChange = (date) => {
    const dateSelected = date.format("YYYY-MM-DD");
    console.log("Dia seleccionado: ", dateSelected);
    setFormulario((prevState) => {
      return {
        ...prevState,
        ["year"]: dateSelected,
      };
    });
  };

  const handleTipoEstadoChange = (tipoEstado) => {
    console.log("El tipo estado es: ", tipoEstado);
    setFormulario((prevState) => {
      return {
        ...prevState,
        ["tipo_estado"]: tipoEstado.toString(),
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
          onChange={handleFormChange}
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
          onChange={handleFormChange}
        />
      </label>
      <br />
      <br />
      <br></br>
      Select de antd
      <label>
        Selecciona un tipo de estado:
        {
          <Antd.Select
            name="tipo_estado"
            defaultValue={
              formulario.tipo_estado
                ? formulario.tipo_estado
                : "Selecciona un tipo de estado"
            }
            onChange={handleTipoEstadoChange}
          >
            {tiposEstadosOptions.map((tipoEstado, index) => (
              <Antd.Select.Option
                key={tipoEstado.value}
                value={tipoEstado.value}
              >
                {tipoEstado.label}
              </Antd.Select.Option>
            ))}
          </Antd.Select>
        }
      </label>
      <br></br>
      DatePicker (fechas) de antd
      <Antd.DatePicker onChange={handleDateChange}></Antd.DatePicker>
      <Antd.Form>
        <Antd.Form.Item label="Nombre">
          <Antd.Input
            type="text"
            name="nombre"
            id="nombre"
            onChange={handleFormChange}
            required
          ></Antd.Input>
        </Antd.Form.Item>
      </Antd.Form>
      <br /> <br />
      <button onClick={handleSubmit}>Enviar</button>
    </>
  );
}

export default FormularioVacacionEmpleado;
