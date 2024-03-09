import React, { createContext, useState, useContext, useEffect } from "react";
import accessCriteriaApi from "../api/accessCriteria";
import categoriesApi from "../api/categories";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [selectedAccessibilities, setSelectedAccessibilities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(1); // default 1km
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoriesApi.getCategories();
        setSelectedCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

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
