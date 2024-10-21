import { createContext, useContext, useMemo, useState } from "react";
import { CARD_DEFAULT, DEFAULT_STORAGE } from "../constant/mockup";


const StorageContext = createContext();

export const useStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }) => {
  const [ storage, setStorage ] = useState(CARD_DEFAULT);

  const handler = useMemo(() => ({
    storage,
    updateStorage: () => setStorage((data) => data)
  }), [storage]);

  return (
    <StorageContext.Provider value={ handler }>
      { children }
    </StorageContext.Provider>
  );
};

