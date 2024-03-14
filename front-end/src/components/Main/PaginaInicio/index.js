import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";

const PaginaInicio = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, permisosUser, setPermisosUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push("/menu-principal");
    } else {
      router.push("/login");
    }
  }, [authUser]);

  return <></>;
};

export default PaginaInicio;
