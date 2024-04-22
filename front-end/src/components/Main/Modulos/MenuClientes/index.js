import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "./styles.module.css";
import Header from "@/components/UtilsComponents/Header";
import Footer from "@/components/UtilsComponents/Footer";
import * as Antd from "antd";

export default function MenuClientes() {
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
      <h1>Clientes</h1>
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
        <Link href={"menu-clientes/clientes"}>
          <Antd.Button
            name="menu-principal"
            onClick={() => handleClick("clientes")}
            loading={loadingButtonPage === "clientes"}
            disabled={
              loadingButtonPage !== "" && loadingButtonPage !== "clientes"
            }
          >
            Clientes
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-clientes/pedidos-clientes"}>
          <Antd.Button
            name="menu-principal"
            onClick={() => handleClick("pedidos-clientes")}
            loading={loadingButtonPage === "pedidos-clientes"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "pedidos-clientes"
            }
          >
            Pedidos clientes
          </Antd.Button>
        </Link>
      </p>
      <Footer />
    </div>
  );
}
