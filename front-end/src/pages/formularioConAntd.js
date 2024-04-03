import { getAllTiposEstadosFacturas } from "@/services/TipoEstadoFacturaService";
import { getAllTiposEstados } from "@/services/TipoEstadoService";
//import antd, { Button, Select } from "antd";
import * as Antd from "antd";
import React, { useEffect, useState } from "react";

function FormularioVacacionEmpleado() {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);
  const [tiposEstadosFacturasOptions, setTiposEstadosFacturasOptions] =
    useState([]);

  const [formulario, setFormulario] = useState({
    year: "",
    tipo_estado: "",
    id_tipo_estado: "",
    fecha_inicio: "",
    fecha_finalizacion: "",
    fecha_1_ANTD: "",
    fecha_2_ANTD: "",
    nombre: "",
  });

  const fetchTiposEstadosOptions = async () => {
    try {
      const resultado = await getAllTiposEstados();
      console.log("Resultado: ", resultado);
      setTiposEstadosOptions(resultado);
      /*setFormulario((prevDataState) => {
        return {
          ...prevDataState,
          ["tipo_estado"]: resultado[0].value.toString(),
        };
      });*/
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  const fetchTiposEstadosFacturasOptions = async () => {
    try {
      const resultado = await getAllTiposEstadosFacturas();
      console.log("Resultado: ", resultado);
      setTiposEstadosFacturasOptions(resultado);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchTiposEstadosOptions();
    fetchTiposEstadosFacturasOptions();
  }, []); // Se ejecuta solo al montar el componente

  const handleFormChange = (event) => {
    console.log("event: ", event.target);
    const { name, value, type, checked, id } = event.target;
    console.log("NAME: ", name, "\nValue: ", value);
    // Manejar cambios según el tipo de input
    setFormulario((prevDataState) => {
      return {
        ...prevDataState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleDateChange = (date, name) => {
    const dateSelected = date.format("YYYY-MM-DD");
    console.log("Dia seleccionado: ", dateSelected, " y el nombre es: ", name);
    setFormulario((prevDataState) => {
      return {
        ...prevDataState,
        [name]: dateSelected,
      };
    });
  };

  const handleTipoEstadoChange = (value, option) => {
    console.log("El tipo estado es: ", value, option);
    setFormulario((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado"]: option?.children.toString(),
        ["id_tipo_estado"]: value.toString(),
      };
    });
  };

  const handleTipoEstadoFacturaChange = (value, option) => {
    console.log("El tipo estado es: ", value, option);
    setFormulario((prevDataState) => {
      return {
        ...prevDataState,
        ["tipo_estado_factura"]: option?.children.toString(),
        ["id_tipo_estado_factura"]: value.toString(),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formulario);
    // Realizar acciones adicionales con los datos del formulario
  };

  return (
    <div>
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
            value={
              formulario.tipo_estado
                ? formulario.tipo_estado
                : "Selecciona un tipo de estado"
            }
            onChange={handleTipoEstadoChange}
            notFoundContent={<span>No hay opciones</span>}
          >
            {tiposEstadosOptions.map((tipoEstado) => (
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
      <label>
        Selecciona un tipo de estado de factura:
        {
          <Antd.Select
            name="tipo_estado_factura"
            value={
              formulario.tipo_estado_factura
                ? formulario.tipo_estado_factura
                : "Selecciona un tipo de estado factura"
            }
            onChange={handleTipoEstadoFacturaChange}
            notFoundContent={<span>No hay opciones</span>}
          >
            {tiposEstadosFacturasOptions.map((tipoEstadoFactura) => (
              <Antd.Select.Option
                key={tipoEstadoFactura.value}
                value={tipoEstadoFactura.value}
              >
                {tipoEstadoFactura.label}
              </Antd.Select.Option>
            ))}
          </Antd.Select>
        }
      </label>
      <br></br>
      DatePicker (fechas) de antd PARA EL YEAR
      <Antd.DatePicker onChange={(date) => handleDateChange(date, "year")} />
      <br></br>
      DatePicker (fechas) de antd PARA EL VALOR FECHA 1
      <Antd.DatePicker
        onChange={(date) => handleDateChange(date, "fecha_1_ANTD")}
      />
      <br></br>
      DatePicker (fechas) de antd PARA EL VALOR FECHA 2
      <Antd.DatePicker
        onChange={(date) => handleDateChange(date, "fecha_2_ANTD")}
      />
      <br></br>
      <Antd.Form>
        <Antd.Form.Item label="Nombre">
          <Antd.Input
            type="text"
            name="nombre"
            id="nombre"
            value={formulario.nombre}
            onChange={handleFormChange}
            status={formulario.nombre === "" ? "error" : ""}
          ></Antd.Input>
        </Antd.Form.Item>
        <Antd.Form.Item label="Apellidos">
          <Antd.Input
            type="text"
            name="apellidos"
            id="apellidos"
            value={formulario.apellidos}
            onChange={handleFormChange}
            status={formulario.apellidos === "" ? "error" : ""}
          ></Antd.Input>
        </Antd.Form.Item>
      </Antd.Form>
      <br /> <br />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default FormularioVacacionEmpleado;
