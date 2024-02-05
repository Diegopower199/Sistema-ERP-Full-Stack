import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";

export default function Facturacion() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const router = useRouter();

  return (
    <>
      <h1>Facturacion</h1>
      <p>
        <Link href={"/menu-principal"}>Menu Principal</Link>
      </p>
      <br />
      <p>
        <Link href={"facturacion/detalles-facturas-clientes"}>Detalles facturas clientes</Link>
      </p>
      <br />
      <p>
        <Link href={"facturacion/facturas-clientes"}>
        Facturas clientes
        </Link>
      </p>
      <br />
      <p>
        <Link href={"facturacion/pagos-facturas-clientes"}>Pagos facturas clientes</Link>
      </p>
      <br />
    </>
  );
}