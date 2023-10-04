import { createContext, useState, useEffect } from "react";
export const LoggedContext = createContext({});

export function LoggedContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const retrievedDataString = localStorage.getItem("user");
    const retrievedData = JSON.parse(retrievedDataString);
    if (retrievedData) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <LoggedContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedContext.Provider>
  );
}
