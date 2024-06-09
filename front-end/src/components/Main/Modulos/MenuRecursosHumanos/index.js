import Footer from "@/components/UtilsComponents/Footer";
import Header from "@/components/UtilsComponents/Header";
import { useAuth } from "@/context/UserContext";
import * as Antd from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuRecursosHumanos() {
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
      <h1>Recursos Humanos</h1>
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
        <Link href={"menu-recursos-humanos/personas"}>
          <Antd.Button
            onClick={() => handleClick("personas")}
            loading={loadingButtonPage === "personas"}
            disabled={
              loadingButtonPage !== "" && loadingButtonPage !== "personas"
            }
          >
            Personas
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/solicitudes-empleados"}>
          <Antd.Button
            onClick={() => handleClick("solicitudes-empleados")}
            loading={loadingButtonPage === "solicitudes-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "solicitudes-empleados"
            }
          >
            Solicitudes Empleados
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/vacaciones-empleados"}>
          <Antd.Button
            onClick={() => handleClick("vacaciones-empleados")}
            loading={loadingButtonPage === "vacaciones-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "vacaciones-empleados"
            }
          >
            Vacaciones Empleados
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/asistencias-empleados"}>
          <Antd.Button
            onClick={() => handleClick("asistencias-empleados")}
            loading={loadingButtonPage === "asistencias-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "asistencias-empleados"
            }
          >
            Asistencias Empleados
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/ayudas-empleados"}>
          <Antd.Button
            onClick={() => handleClick("ayudas-empleados")}
            loading={loadingButtonPage === "ayudas-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "ayudas-empleados"
            }
          >
            Ayudas Empleados
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/bajas-laborales-empleados"}>
          <Antd.Button
            onClick={() => handleClick("bajas-laborales-empleados")}
            loading={loadingButtonPage === "bajas-laborales-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "bajas-laborales-empleados"
            }
          >
            Bajas Laborales Empleados
          </Antd.Button>
        </Link>
      </p>
      <br />
      <p>
        <Link href={"menu-recursos-humanos/nominas-empleados"}>
          <Antd.Button
            onClick={() => handleClick("nominas-empleados")}
            loading={loadingButtonPage === "nominas-empleados"}
            disabled={
              loadingButtonPage !== "" &&
              loadingButtonPage !== "nominas-empleados"
            }
          >
            Nóminas Empleados
          </Antd.Button>
        </Link>
      </p>
      <Footer />
    </div>
  );
}
