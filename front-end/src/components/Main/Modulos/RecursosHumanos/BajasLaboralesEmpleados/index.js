import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function BajasLaboralesEmpleados() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  return (
    <>
      <h1>Bajas Laborales Empleados</h1>
      <p>
        <Link href={"/recursos-humanos"}>Menu Recursos humanos</Link>
      </p>
    </>
  );
}