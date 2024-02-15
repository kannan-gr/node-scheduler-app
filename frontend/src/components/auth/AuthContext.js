import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(Cookies.get("jwt") || null);

  const login = (token) => {
    setJwt(token);
    Cookies.set("jwt", token, { expires: 7 });
  };

  const logout = () => {
    setJwt(null);
    Cookies.remove("jwt");
  };

  return (
    <AuthContext.Provider value={{ jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
