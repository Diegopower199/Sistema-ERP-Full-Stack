import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";

const ServerConnectionError = ({ message }) => {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    permisosUser,
    setPermisosUser,
  } = useAuth();

  const router = useRouter();

  return (
    <div className={styles.DivCentrado}>
      <h1 className={styles.Message}>
        {message}
        <button
          className={styles.Button}
          onClick={() => {
            setAuthUser(null);
            setIsLoggedIn(false);
            setPermisosUser(null);
            router.push("/login");
          }}
        >
          Ir al login
        </button>
      </h1>
    </div>
  );
};

export default ServerConnectionError;
