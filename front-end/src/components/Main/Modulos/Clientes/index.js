import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function Clientes() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  return (
    <>
      <h1>Clientes</h1>
      <p>
        <Link href={"/menu-principal"}>Menu Principal</Link>
      </p>
      <br />
      <p>
        <Link href={"clientes/clientes"}>Clientes</Link>
      </p>
      <br />
      <p>
        <Link href={"clientes/pedidos-clientes"}>
        Pedidos clientes
        </Link>
      </p>
      <br />
    </>
  );
}