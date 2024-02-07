import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function MenuPrincipal() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, permisosUser, setPermisosUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    console.log("Pagina de menu principal: ");
    console.log("authUser: ", authUser, "permisosUser: ", permisosUser);
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
    setPermisosUser(null)
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
        <Link href={`/menu-recursos-humanos`} as={`/menu-recursos-humanos`}>
          Menu Recursos Humanos
        </Link>
      </p>
      <br />
      <br />
      <p>
        <Link href={`/menu-clientes`} as={`/menu-clientes`}>
          Menu Clientes
        </Link>
      </p>
      <br />
      <br />
      <p>
        <Link href={`/menu-facturacion`} as={`/menu-facturacion`}>
          Menu Facturacion
        </Link>
      </p>
    </>
  );
}
