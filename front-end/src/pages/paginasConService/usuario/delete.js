import { deleteUsuario, getAllUsuarios } from "@/services/usuarioService";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [dataSource, setDataSource] = useState([]);

  const fetchGetAllUsuarios = async () => {
    try {
      const resultado = await getAllUsuarios();
      console.log("Resultado: ", resultado);
      setDataSource(resultado);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  const fetchDeleteUsuario = async (id) => {
    try {
      console.log("ID: ", id);
      const resultado = await deleteUsuario(id);
      console.log("Resultado: ", resultado);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchGetAllUsuarios();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <>
      {dataSource.length !== 0 &&
        dataSource.map((data, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p>Nombre usuario: {data.nombre_usuario}</p>
              <p>Contraseña: {data.password}</p>
              <button onClick={() => fetchDeleteUsuario(data.id_usuario)}>
                ELIMINAR USUARIO
              </button>
            </div>
          );
        })}
      BORRAR NO FUNCIONA, TENGO QUE MIRARLO
      <button onClick={() => console.log("Data source: ", dataSource)}>
        BOTON
      </button>
    </>
  );
}

export default MiFormulario;
