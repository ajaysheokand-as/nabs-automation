import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedEproceeding, setSelectedEproceeding] = useState(null);

  return (
    <AppContext.Provider
      value={{ selectedEproceeding, setSelectedEproceeding }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
