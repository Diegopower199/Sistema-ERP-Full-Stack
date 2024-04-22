import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";

export default function MenuFacturacion() {
  const { authUser, permisosUser } = useAuth();

  const [loadingButtonPage, setLoadingButtonPage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser]);

  const handleClick = (buttonName) => {
    if (loadingButtonPage === "") {
      setLoadingButtonPage(buttonName);
    }
  };

  return (
    <div>
      <Header />
      <h1>Facturación</h1>
      <p>
        <Link href={"/menu-principal"}>
          <Antd.Button
            name="menu-principal"
            onClick={() => handleClick("menu-principal")}
            loading={loadingButtonPage === "menu-principal"}
            disabled={
              loadingButtonPage !== "" && loadingButtonPage !== "menu-principal"
            }
          >
            Menú Principal
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-facturacion/facturas-clientes"}>
          <Antd.Button
            onClick={() => handleClick("facturas-clientes")}
            loading={loadingButtonPage === "facturas-clientes"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "facturas-clientes"
            }
          >
            Facturas clientes
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-facturacion/pagos-facturas-clientes"}>
          <Antd.Button
            onClick={() => handleClick("pagos-facturas-clientes")}
            loading={loadingButtonPage === "pagos-facturas-clientes"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "pagos-facturas-clientes"
            }
          >
            Pagos facturas clientes
          </Antd.Button>
        </Link>
      </p>
      <br />
      <Footer />
    </div>
  );
}
