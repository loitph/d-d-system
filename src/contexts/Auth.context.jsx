import { createContext, useContext, useMemo, useState } from "react";
import { USER_DATA } from "../constant/mockup";

export const AuthContext = createContext({
  username: '',
  token: '',
  configure: [],
});

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({
    username: '',
    token: '',
    configure: [],
  });

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
