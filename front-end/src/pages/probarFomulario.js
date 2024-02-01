import { getAllTiposEstados } from "@/services/TipoEstadoService";
import { PROVINCIAS_CON_CIUDADES } from "@/utils/provinciasConCiudades";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [tiposEstadosOptions, setTiposEstadosOptions] = useState([]);

  // Valor seleccionado en tipo estado
  const [tipoEstadoSelected, setTipoEstadoSelected] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    tipo_estado: 0,
    fecha_nacimiento: null,
    provincia: PROVINCIAS_CON_CIUDADES[0].provincia,
    ciudad: "",
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
    console.log("name", name, "\nvalue", value, "\nformulario", formulario);
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

  // HACER ESTO PARA LOS DEMAS FORMULARIOS
  const [firstCheck, setFirstCheck] = useState(true); //Takes the value of requiredFieldsFilled if it is false firstCheckRequiredFieldsFilled
  async function sendData() {
    // Check if all required fields are filled
    let requiredFieldsFilled = true;
    if (formData.nombre === "" || formData.nombre === undefined) {
      requiredFieldsFilled = false;
    }
    if (formData.apellidos === "" || formData.apellidos === undefined) {
      requiredFieldsFilled = false;
    }
    if (
      formData.numero_empleado === undefined ||
      formData.numero_empleado === ""
    ) {
      requiredFieldsFilled = false;
    }
    if (
      formData.proyecto_car_id === undefined ||
      formData.proyecto_car_id === ""
    ) {
      requiredFieldsFilled = false;
    }
    if (formData.categoria_id === undefined || formData.categoria_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.cliente_id === undefined || formData.cliente_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.linea_id === undefined || formData.linea_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.sublinea_id === undefined || formData.sublinea_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.origen_id === undefined || formData.origen_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.headcount === undefined || formData.headcount === "") {
      requiredFieldsFilled = false;
    }
    if (formData.fecha_de_alta === undefined || formData.fecha_de_alta === "") {
      requiredFieldsFilled = false;
    }
    if (formData.oficina_id === undefined || formData.oficina_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.zona_id === undefined || formData.zona_id === "") {
      requiredFieldsFilled = false;
    }
    if (formData.sueldo === undefined || formData.sueldo === "") {
      requiredFieldsFilled = false;
    }
    if (formData.puntero_id === undefined || formData.puntero_id === "") {
      requiredFieldsFilled = false;
    }

    if (requiredFieldsFilled) {
      // If all required fields are filled, send the data to the server
      if (actualData !== null) {
        console.log("baja", formData.fecha_de_baja);
        const saveData = {
          numero_empleado: formData.numero_empleado,
          headcount: formData.headcount,
          sueldo: formData.sueldo,
          comentarios: formData.comentarios,
          nameERP: formData.apellidos + ", " + formData.nombre,
          categoria: {
            categoria_id: parseInt(formData.categoria_id),
          },
          oficina: {
            oficina_id: parseInt(formData.oficina_id),
          },
          origen: {
            origen_id: parseInt(formData.origen_id), // ESTO ES ASI PORQUE EN EL INDEX DE PERSONAS BEC LLAMAMOS CON VARIABLE ORIGEN AL ORIGEN_ID eso lo deberia cambiar
          },
          sublinea: {
            sublinea_id: parseInt(formData.sublinea_id),
            linea: {
              linea_id: parseInt(formData.linea_id),
            },
          },
          cliente: {
            cliente_id: parseInt(formData.cliente_id),
          },
          proyecto_car: {
            proyectos_car_id: parseInt(formData.proyecto_car_id),
          },
          puntero: {
            personabec_id: parseInt(formData.puntero_id),
          },
          cuenta_id: parseInt(formData.cuenta_id),
        };

        console.log(
          "Saving data modifyPersona(formData.id, saveData):",
          saveData
        );
        if (type == "persona") {
          modifyPersona(formData.id, saveData)
            .then(toggleForm())
            .then(updateTrigger());
        } else {
          modifyPersona(formData.personabec_id, saveData)
            .then(toggleForm())
            .then(updateTrigger());
        }
      } else {
        console.log(
          "Saving data con la funcion PersonasBECService(save, formData):",
          formData
        );
        const response = await PersonasBECService("save", formData);
        // Show an alert with the server's response FOR DEBUGGING
        if (response === "OK") {
          toggleForm();
          updateTrigger();
        }
      }
    } else {
      // If not all required fields are filled, show an alert
      setFirstCheck(requiredFieldsFilled);
    }
  }

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
      <br />
      <label>
        Selecciona una provincia:
        <select
          name="provincia"
          value={formulario.provincia}
          onChange={handleChange}
        >
          {PROVINCIAS_CON_CIUDADES.map((provincia, index) => (
            <option key={index} value={provincia.provincia}>
              {provincia.provincia}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <label>
        Selecciona una ciudad:
        <select name="ciudad" value={formulario.ciudad} onChange={handleChange}>
          {PROVINCIAS_CON_CIUDADES.find(
            (provincia) => provincia.provincia === formulario.provincia
          )?.ciudades.map((ciudad, index) => (
            <option key={index} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MiFormulario;
