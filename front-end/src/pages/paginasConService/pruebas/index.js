
import { getAllVacacionesEmpleados } from "@/services/VacacionEmpleadoService";
import React, { useEffect, useState } from "react";

function MiFormulario() {
  const [dataSource, setDataSource] = useState([]);

  const fetchGetAllPersonas = async () => {
    try {
      const resultado = await getAllVacacionesEmpleados();
      console.log("Resultado: ", resultado);
      setDataSource(resultado);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchGetAllPersonas();
  }, []); // Se ejecuta solo al montar el componente

  return (
    <>
      
    </>
  );
}

export default MiFormulario;
