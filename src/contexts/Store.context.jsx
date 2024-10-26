import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [ userConfig, setUserConfig ] = useState({
    id: '',
    board: [],
    widget: []
  });

  const [ widgetDragged, setWidgetDragged ] = useState({
    id: '',
    slot: '',
    value: '',
    type: ''
  });

  const [ showDialogWidget, setShowDialogWidget ] = useState(false);

  const [ widgetAdjust, setWidgetAdjust ] = useState({
    id: '',
    slot: '',
    value: '',
    type: ''
  });

  return (
    <StoreContext.Provider
      value={{
        userConfig, setUserConfig,
        widgetDragged, setWidgetDragged,
        showDialogWidget, setShowDialogWidget,
        widgetAdjust, setWidgetAdjust,
      }}
    >
      { children }
    </StoreContext.Provider>
  );
};
