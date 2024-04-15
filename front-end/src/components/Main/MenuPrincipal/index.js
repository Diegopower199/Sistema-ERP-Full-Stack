import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

export default function MenuPrincipal() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser]);

  return (
    <div>
      <Header />
      <h1>MENU PRINCIPAL</h1>
      {permisosUser && permisosUser.ver_section_recursos_humanos && (
        <div>
          <p>
            <Link href={`/menu-recursos-humanos`} as={`/menu-recursos-humanos`}>
              Menu Recursos Humanos
            </Link>
          </p>
          <br />
          <br />
        </div>
      )}
      {permisosUser && permisosUser.ver_section_clientes && (
        <div>
          <p>
            <Link href={`/menu-clientes`} as={`/menu-clientes`}>
              Menu Clientes
            </Link>
          </p>
          <br />
          <br />
        </div>
      )}

      {permisosUser && permisosUser.ver_section_facturacion && (
        <div>
          <p>
            <Link href={`/menu-facturacion`} as={`/menu-facturacion`}>
              Menu Facturacion
            </Link>
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}
