import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedEproceeding, setSelectedEproceeding] = useState(null);

  const [selectedClientDetails, setSelectedClientDetails] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedEproceeding,
        setSelectedEproceeding,
        selectedClientDetails,
        setSelectedClientDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
