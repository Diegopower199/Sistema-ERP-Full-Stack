import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function NominasEmpleados() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  return (
    <>
      <h1>Nominas Empleados</h1>
      <p>
        <Link href={"/recursos-humanos"}>Menu Recursos humanos</Link>
      </p>
    </>
  );
}