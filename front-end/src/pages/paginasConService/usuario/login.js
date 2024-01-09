import { authenticateUser } from "@/services/UsuarioService";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  // Valor seleccionado en tipo estado
  const [tipoEstadoSelected, setTipoEstadoSelected] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre_usuario: "",
    password: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formulario);
      const resultado = await authenticateUser(formulario.nombre_usuario, formulario.password);
      console.log("Resultado en handleSubmit: ", resultado); 
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre usuario:
        <input
          type="text"
          name="nombre_usuario"
          value={formulario.nombre_usuario}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formulario.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default MiFormulario;
