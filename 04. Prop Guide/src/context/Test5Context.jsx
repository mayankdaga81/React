import { createContext, useState } from "react";

// Step1 - Create the context
const Test5Context = createContext();

// Step 2 - Create the provider function.

export function Test5Provider({ children }) {
  const [count, setCount] = useState(0);

  function increament() {
    setCount(() => count + 1);
  }

  function decreament() {
    if (count === 0) {
      throw new Error("Count can not be negative");
    }
    setCount(() => count - 1);
  }

  function reset() {
    setCount(0);
  }

  const value = {
    count,
    increament,
    decreament,
    reset,
  };

  return (
    <Test5Context.Provider value={value}>{children}</Test5Context.Provider>
  );
}

export default Test5Context;
