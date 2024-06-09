import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PaginaInicio = () => {
  const { authUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push("/menu-principal");
    } else {
      router.push("/login");
    }
  }, [authUser]);

  return <div></div>;
};

export default PaginaInicio;
