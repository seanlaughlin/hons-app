import React, { createContext, useState, useContext, useEffect } from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [selectedAccessibilities, setSelectedAccessibilities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(1); // default 1km
  const [searchTerm, setSearchTerm] = useState(null);

  let filters = {
    selectedAccessibilities,
    selectedCategories,
    selectedDistance,
    searchTerm,
  };

  const updateFilters = () => {
    filters = {
      selectedAccessibilities,
      selectedCategories,
      selectedDistance,
      searchTerm,
    };
  };

  useEffect(() => {
    updateFilters();
  }, [
    selectedAccessibilities,
    selectedCategories,
    selectedDistance,
    searchTerm,
  ]);

  return (
    <FilterContext.Provider
      value={{
        selectedAccessibilities,
        setSelectedAccessibilities,
        selectedCategories,
        setSelectedCategories,
        selectedDistance,
        setSelectedDistance,
        searchTerm,
        setSearchTerm,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider"
    );
  }
  return context;
};
