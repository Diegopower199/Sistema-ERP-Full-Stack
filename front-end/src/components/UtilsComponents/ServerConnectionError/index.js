import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";
import * as Antd from "antd";

const ServerConnectionError = ({ message }) => {
  const { setAuthUser, setIsLoggedIn, setPermisosUser } = useAuth();

  const router = useRouter();

  return (
    <div className={styles.DivCentrado}>
      <div className={styles.BackendError}>
        {message}
        <Antd.Button
          className={styles.Button}
          onClick={() => {
            setAuthUser(null);
            setIsLoggedIn(false);
            setPermisosUser(null);
            router.push("/login");
          }}
        >
          Ir al login
        </Antd.Button>
      </div>
    </div>
  );
};

export default ServerConnectionError;
