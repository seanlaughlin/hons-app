import React, { createContext, useState, useContext, useEffect } from "react";

import categoriesApi from "../api/categories";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [selectedAccessibilities, setSelectedAccessibilities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(5); // default 1km
  const [searchTerm, setSearchTerm] = useState(null);
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({});

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

  useEffect(() => {
    setFilters({
      accessibilityCriteria: selectedAccessibilities.map(
        (accessibility) => accessibility.criteria
      ),
      categoryIds: selectedCategories.map((category) => category._id),
      selectedDistance,
      searchTerm,
    });
  }, [
    selectedAccessibilities,
    selectedCategories,
    selectedDistance,
    searchTerm,
    location,
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
        location,
        setLocation,
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
