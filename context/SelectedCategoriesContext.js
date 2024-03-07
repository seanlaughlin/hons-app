import React, { createContext, useState, useContext } from "react";

const SelectedCategoriesContext = createContext();

export const SelectedCategoriesProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <SelectedCategoriesContext.Provider
      value={{ selectedCategories, setSelectedCategories }}
    >
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export const useSelectedCategories = () => {
  const context = useContext(SelectedCategoriesContext);
  if (!context) {
    throw new Error(
      "useSelectedCategories must be used within a SelectedCategoriesProvider"
    );
  }
  return context;
};
