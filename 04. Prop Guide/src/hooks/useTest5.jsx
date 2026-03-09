import { useContext } from "react";
import Test5Context from "../context/Test5Context";

export function useTest5() {
  const context = useContext(Test5Context);

  if (!context) {
    throw new Error("Context is not within the Providers");
  }

  return context;
}
