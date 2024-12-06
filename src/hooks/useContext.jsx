import { useContext } from "react";
import { AuthContext } from "@/context/AuthContex";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Verifica si tienes encapsulado el provider en app");
  }

  return authContext;
};

export default useAuthContext;
