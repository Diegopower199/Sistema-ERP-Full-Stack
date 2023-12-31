import { authenticateUser, saveUsuario, updateUsuario } from "@/services/usuarioService";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [formValue, setFormValue] = useState({
    nombre_usuario: "",
    password: "",
    id_persona: "",
    id_tipo_usuario: "",
  });
  const [idUsuario, setIdUsuario] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Manejar cambios según el tipo de input
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (event) => {
    // Esto deberá ser una funcion que se llama addUserButton handleSubmit
    event.preventDefault();
    let errorDevueltoBack = false;
    try {
      console.log(formValue);
      const resultado = await updateUsuario(idUsuario, formValue);
      console.log("Resultado en handleSubmit: ", resultado);

      if (resultado.status !== 200) {
        const mensajeError = resultado.messageError;
        console.log("El error es: ", mensajeError);
        setErrorMessage(mensajeError);
        errorDevueltoBack = true;
      } else {
        errorDevueltoBack = false;
      }

      if (!errorDevueltoBack) {
        setErrorMessage("");
      }
    } catch (error) {
      console.log("Error al agregar registro: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID usuario:
        <input
          type="number"
          name="id_usuario"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
      </label>
      <br />
      <br />

      <label>
        Nombre usuario:
        <input
          type="text"
          name="nombre_usuario"
          value={formValue.nombre_usuario}
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
          value={formValue.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Id persona:
        <input
          type="number"
          name="id_persona"
          value={formValue.id_persona}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Id tipo usuario:
        <input
          type="number"
          name="id_tipo_usuario"
          value={formValue.id_tipo_usuario}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <button type="submit">Enviar</button>

      {errorMessage.length !== 0 && (
        <>
          <p>Error: {errorMessage}</p>
        </>
      )}
    </form>
  );
}

export default MiFormulario;
