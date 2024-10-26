import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: '',
  username: '',
  token: '',
});

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({
    id: '',
    username: '',
    token: '',
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
