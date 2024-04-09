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

export default function MenuClientes() {
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
    <div>
      <Header />
      <h1>Clientes</h1>
      <p>
        <Link href={"/menu-principal"}>Menu Principal</Link>
      </p>
      <br />
      <p>
        <Link href={"menu-clientes/clientes"}>Clientes</Link>
        <Button color="primary" startIcon={<CheckIcon />}></Button>La tabla y
        form
      </p>
      <br />
      <p>
        <Link href={"menu-clientes/pedidos-clientes"}>Pedidos clientes</Link>
      </p>
      <br />
      <Footer />
    </div>
  );
}
