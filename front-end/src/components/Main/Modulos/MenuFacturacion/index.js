import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

export default function MenuFacturacion() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  return (
    <>
      <Header />
      <h1>Facturacion</h1>
      <p>
        <Link href={"/menu-principal"}>Menu Principal</Link>
      </p>
      <br />
      <p>
        <Link href={"menu-facturacion/facturas-clientes"}>
          Facturas clientes
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-facturacion/pagos-facturas-clientes"}>
          Pagos facturas clientes
        </Link>
      </p>
      <br />
      <Footer />
    </>
  );
}
