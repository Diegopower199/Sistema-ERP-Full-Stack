/*import React, { useState } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateForm = () => {
    // Lógica de validación (puedes personalizar según tus necesidades)
    if (username.trim() === "") {
      // Muestra el mensaje de error si el campo está vacío
      setUsernameError("Por favor, ingresa un nombre de usuario.");
    } else {
      // Limpia el mensaje de error si el campo es válido
      setUsernameError("");
    }
  };

  return (
    <div>
      <label htmlFor="username">Nombre de usuario:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {usernameError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {usernameError}
        </div>
      )}

      <button type="button" onClick={validateForm}>
        Validar
      </button>
    </div>
  );
};*/

import React, { useState } from "react";

const TuComponente = ({ operationType, handleChange, tiposEstadosOptions }) => {
  const [erroresDelFormulario, setErroresDelFormulario] = useState({});

  const [tiposPersonasOptions, setTiposPersonasOptions] = useState([]);

  const [formData, setFormValue] = useState({
    numero_empleado: "0",
    nombre: "",
    apellidos: "",
    genero: "Masculino",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    numero_telefono: "34",
    correo_electronico: "",
    id_tipo_persona: "1",
  });

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (operationType !== "view") {
      // Validación para el campo fecha_inicio
      if (!formData.fecha_inicio) {
        nuevosErrores.fecha_inicio =
          "Por favor, selecciona una fecha de inicio";
      }

      // Validación para el campo fecha_fin
      if (!formData.fecha_fin) {
        nuevosErrores.fecha_fin = "Por favor, selecciona una fecha de fin";
      }

      // Otras validaciones para los demás campos si es necesario
      // Ejemplo de validación para el campo dni
      if (!formData.dni) {
        nuevosErrores.dni = "Por favor, ingresa un DNI";
      }

      // Otras validaciones para los demás campos
    }

    // Actualiza el estado de errores
    setErroresDelFormulario(nuevosErrores);

    // Devuelve verdadero si no hay errores, falso si hay errores
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    // Validar el formulario antes de enviar
    const formularioValido = validarFormulario();

    // Si el formulario es válido, proceder con la lógica de envío
    if (formularioValido) {
      // Lógica para enviar el formulario o realizar otras acciones
    } else {
      // Puedes mostrar un mensaje o manejar de alguna manera los errores
      console.log("Formulario no válido. Corrige los errores antes de enviar");
    }
  };

  return (
    <div>
      <label>
        Fecha inicio:
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          placeholder="Fecha inicio"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
        {erroresDelFormulario.fecha_inicio && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {erroresDelFormulario.fecha_inicio}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Fecha fin:
        <input
          type="date"
          name="fecha_fin"
          value={formData.fecha_fin}
          placeholder="Fecha fin"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
        {erroresDelFormulario.fecha_fin && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {erroresDelFormulario.fecha_fin}
          </div>
        )}
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Dias disponibles:
            <input
              type="number"
              name="dias_disponibles"
              value={formData.dias_disponibles}
              readOnly={true}
            />
          </label>
          {/* No se muestran mensajes de error para campos de solo lectura */}
          <br />
          <br />
          <label>
            Dias pendientes:
            <input
              type="number"
              name="dias_pendientes"
              value={formData.dias_pendientes}
              readOnly={true}
            />
          </label>
          {/* No se muestran mensajes de error para campos de solo lectura */}
          <br />
          <br />
          <label>
            Dias solicitados:
            <input
              type="number"
              name="dias_solicitados"
              value={formData.dias_solicitados}
              readOnly={true}
            />
          </label>
          {/* No se muestran mensajes de error para campos de solo lectura */}
          <br />
          <br />
          <label>
            Dias disfrutados:
            <input
              type="number"
              name="dias_disfrutados"
              value={formData.dias_disfrutados}
              readOnly={true}
            />
          </label>
          {/* No se muestran mensajes de error para campos de solo lectura */}
        </>
      )}
      <br />
      <br />
      <label>
        Comentarios:
        <input
          type="text"
          name="comentarios"
          value={formData.comentarios}
          placeholder="Comentarios"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
        {erroresDelFormulario.comentarios && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {erroresDelFormulario.comentarios}
          </div>
        )}
      </label>
      <br />
      <br />
      <label>
        Dni:
        <input
          type="text"
          name="dni"
          value={formData.dni}
          placeholder="Dni"
          onChange={operationType === "view" ? null : handleChange}
          readOnly={operationType === "view" ? true : false}
        />
        {erroresDelFormulario.dni && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {erroresDelFormulario.dni}
          </div>
        )}
      </label>
      {(operationType === "update" || operationType === "view") && (
        <>
          <br />
          <br />
          <label>
            Selecciona un tipo de estado:
            <select
              name="id_tipo_estado"
              value={formData.id_tipo_estado}
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
          {/* No se muestran mensajes de error para campos de solo lectura */}
        </>
      )}
      <br />
      <br />
      <button type="button" onClick={handleSubmit}>
        Enviar
      </button>
    </div>
  );
};

export default TuComponente;

// export default App;
