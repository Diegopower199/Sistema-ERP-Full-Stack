import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import { getAllPersonas } from "@/services/personaService";

export default function Personas() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  const [dataSource, setDataSource] = useState([]);

  const fetchGetAllPersonas = async () => {
    try {
      const resultado = await getAllPersonas();
      console.log("Resultado: ", resultado);
      setDataSource(resultado);
    } catch (error) {
      console.error("El error es: ", error);
    }
  };

  useEffect(() => {
    console.log("Pagina de login: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    }
    fetchGetAllPersonas();
  }, [authUser]);

  return (
    <>
      <h1>Personas</h1>
      <p>
        <Link href={"/recursos-humanos"}>Menu Recursos humanos</Link>
      </p>

      {dataSource.length !== 0 &&
        dataSource.map((data, index) => {
          return (
            <div key={index}>
              <p>Nombre usuario: {data.nombre_usuario}</p>
              <p>Contraseña: {data.password}</p>
            </div>
          );
        })}
    </>
  );
}
