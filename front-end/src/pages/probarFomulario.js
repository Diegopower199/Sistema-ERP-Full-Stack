import { getAllTiposEstados } from "@/services/TipoEstadoService";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  // Valor seleccionado en tipo estado
  const [tipoEstadoSelected, setTipoEstadoSelected] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    tipo_estado: 0,
    fecha_nacimiento: null,
  });

  const fetchTiposEstadosOptions = async () => {
    try {
      const resultado = await getAllTiposEstados();
      console.log("Resultado: ", resultado);
      setTiposEstadosOptions(resultado);
      setFormulario((prevState) => {
        return {
          ...prevState,
          ["tipo_estado"]: resultado[0].value,
        };
      });
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchTiposEstadosOptions();
  }, []); // Se ejecuta solo al montar el componente

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />

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
        Fecha de Nacimiento:
        <input
          type="date"
          name="fecha_nacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default MiFormulario;