import { getAllUsuarios } from "@/services/UsuarioService";
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

  useEffect(() => {
    fetchGetAllUsuarios();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <>
      {dataSource.length !== 0 &&
        dataSource.map((data, index) => {
          return (
            <div key={index}>
              <p>Nombre usuario: {data.nombre_usuario}</p>
              <p>Contraseña: {data.password}</p>
            </div>
          );
        })}
      <button onClick={() => console.log("Data source: ", dataSource)}>
        BOTON
      </button>
    </>
  );
}

export default MiFormulario;
