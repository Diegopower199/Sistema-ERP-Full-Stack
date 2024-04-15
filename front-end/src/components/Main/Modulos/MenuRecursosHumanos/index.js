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

export default function MenuRecursosHumanos() {
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
      <h1>Recursos Humanos</h1>
      <p>
        <Link href={"/menu-principal"}>Menu Principal</Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/personas"}>Personas</Link>
        <Button color="primary" startIcon={<CheckIcon />}></Button>La tabla y
        form
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/solicitudes-empleados"}>
          Solicitudes Empleados
        </Link>
        <Button color="primary" startIcon={<CheckIcon />}></Button>La tabla y
        form
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/vacaciones-empleados"}>
          Vacaciones Empleados
        </Link>
        <Button color="primary" startIcon={<CheckIcon />}></Button>La tabla y
        form
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/asistencias-empleados"}>
          Asistencias Empleados
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/ayudas-empleados"}>
          Ayudas Empleados
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/bajas-laborales-empleados"}>
          Bajas Laborales Empleados
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/nominas-empleados"}>
          Nominas Empleados
        </Link>
      </p>
      <Footer />
    </div>
  );
}
