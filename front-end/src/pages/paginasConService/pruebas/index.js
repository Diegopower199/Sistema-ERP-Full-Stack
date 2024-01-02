import { getAllAsistenciaEmpleados } from "@/services/asistenciaEmpleadoService";
import { getAllAyudasEmpleados } from "@/services/ayudaEmpleadoService";
import { getAllBajasLaboralesEmpleados } from "@/services/bajaLaboralEmpleadoService";
import { getAllPersonas } from "@/services/personaService";
import { getAllSolicitudesEmpleados } from "@/services/solicitudEmpleadoService";
import { getAllVacacionesEmpleados } from "@/services/vacacionEmpleadoService";
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
