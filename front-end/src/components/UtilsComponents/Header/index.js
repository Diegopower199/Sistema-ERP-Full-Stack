import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import * as Antd from "antd";
import styles from "./styles.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const { authUser, setAuthUser, setIsLoggedIn, setPermisosUser } = useAuth();

  const router = useRouter();

  const handleCerrarSesion = () => {
    cerrarSesion();
  };

  function cerrarSesion() {
    setIsLoggedIn(false);
    setAuthUser(null);
    setPermisosUser(null);
    router.push("/login");
  }

  return (
    <div className={styles.PosicionHeader}>
      <div className={styles.DivNombreEmpresa}>
        <p>TechSoluciones Informáticas S.L.</p>
      </div>
      <div className={styles.DivCerrarSesion}>
        <p style={{ marginRight: "4px" }}>{authUser?.nombre_usuario} </p>
        <Antd.Avatar size="large" icon={<AccountCircleIcon />} />
        <Antd.Button
          className={styles.ButtonCerrarSesion}
          onClick={handleCerrarSesion}
        >
          Cerrar sesión
        </Antd.Button>
      </div>
    </div>
  );
};

export default Header;
