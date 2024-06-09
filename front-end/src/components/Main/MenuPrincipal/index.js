import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import { useAuth } from "@/context/UserContext";
import * as Antd from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuPrincipal() {
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
      <h1>MENU PRINCIPAL</h1>
      {permisosUser && permisosUser.ver_section_recursos_humanos && (
        <div>
          <p>
            <Link href={"/menu-recursos-humanos"} as={`/menu-recursos-humanos`}>
              <Antd.Button
                onClick={() => handleClick("menu-recursos-humanos")}
                loading={loadingButtonPage === "menu-recursos-humanos"}
                disabled={
                  loadingButtonPage !== "" &&
                  loadingButtonPage !== "menu-recursos-humanos"
                }
              >
                Menú Recursos Humanos
              </Antd.Button>
            </Link>
          </p>
          <br />
        </div>
      )}

      {permisosUser && permisosUser.ver_section_clientes && (
        <div>
          <p>
            <Link href={"/menu-clientes"} as={`/menu-clientes`}>
              <Antd.Button
                onClick={() => handleClick("menu-clientes")}
                loading={loadingButtonPage === "menu-clientes"}
                disabled={
                  loadingButtonPage !== "" &&
                  loadingButtonPage !== "menu-clientes"
                }
              >
                Menú Clientes
              </Antd.Button>
            </Link>
          </p>
          <br />
        </div>
      )}

      {permisosUser && permisosUser.ver_section_facturacion && (
        <div>
          <p>
            <Link href={"/menu-facturacion"} as={`/menu-facturacion`}>
              <Antd.Button
                onClick={() => handleClick("menu-facturacion")}
                loading={loadingButtonPage === "menu-facturacion"}
                disabled={
                  loadingButtonPage !== "" &&
                  loadingButtonPage !== "menu-facturacion"
                }
              >
                Menú Facturación
              </Antd.Button>
            </Link>
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}
