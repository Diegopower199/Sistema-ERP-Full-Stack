import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";

// Quitar esto
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";

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
        <Button color="primary" startIcon={<CheckIcon />}></Button>La tabla, FORM NO
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
