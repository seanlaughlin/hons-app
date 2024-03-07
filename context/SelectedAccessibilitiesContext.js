import React, { createContext, useState, useContext, useEffect } from "react";

import accessCriteriaApi from "../api/accessCriteria";
import useApi from "../hooks/useApi";

const SelectedAccessibilitiesContext = createContext();

export const SelectedAccessibilitiesProvider = ({ children }) => {
  const [selectedAccessibilities, setSelectedAccessibilities] = useState([]);

  return (
    <SelectedAccessibilitiesContext.Provider
      value={{ selectedAccessibilities, setSelectedAccessibilities }}
    >
      {children}
    </SelectedAccessibilitiesContext.Provider>
  );
};

export const useSelectedAccessibilities = () => {
  const context = useContext(SelectedAccessibilitiesContext);
  if (!context) {
    throw new Error(
      "useSelectedAccessibilities must be used within a SelectedAccessibilitiesProvider"
    );
  }
  return context;
};
