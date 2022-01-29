import React, { useState } from "react";

export const Context = React.createContext();
export const AuthTokenContext = React.createContext()

const GlobalStorage = ({ children }) => {
  const [userDetail, setUserDetail] = useState({ test: "test" });

  return (
    <Context.Provider value={[userDetail, setUserDetail]}>
      {children}
    </Context.Provider>
  );
};

export default GlobalStorage;
