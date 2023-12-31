import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function MenuPrincipal() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    console.log("Pagina de menu principal: ");
    console.log("authUser: ", authUser);
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser]);

  const handleCerrarSesion = () => {
    cerrarSesion();
  };

  function cerrarSesion() {
    setIsLoggedIn(false);
    setAuthUser(null);
    console.log("Cerramos sesion: ", isLoggedIn);
  }

  return (
    <>
      <h1>MENU PRINCIPAL</h1>
      <button onClick={handleCerrarSesion}>Cerrar sesion</button>
      <br /> <br />
      {"Usuario: " + authUser?.nombre_usuario} <br />
      {"Password: " + authUser?.password}
      <br />
      <br />
      <p>
        <Link href={`/recursos-humanos`} as={`/recursos-humanos`}>
          Recursos Humanos
        </Link>
      </p>
      <br />
      <br />
      <p>
        <Link href={`/clientes`} as={`/clientes`}>
          Clientes
        </Link>
      </p>
      <br />
      <br />
      <p>
        <Link href={`/facturacion`} as={`/facturacion`}>
          Facturacion
        </Link>
      </p>
    </>
  );
}
