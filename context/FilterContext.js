import React, { createContext, useState, useContext, useEffect } from "react";

import categoriesApi from "../api/categories";
import typesApi from "../api/types";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [selectedAccessibilities, setSelectedAccessibilities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [transportMode, setTransportMode] = useState("walking");
  const [selectedTravelDuration, setSelectedTravelDuration] = useState(10);
  const [selectedDistance, setSelectedDistance] = useState(1); // default 1km
  const [searchTerm, setSearchTerm] = useState(null);
  const [location, setLocation] = useState(null);
  const [showNoReviews, setShowNoReviews] = useState(false);
  const [showMixedReviews, setShowMixedReviews] = useState(true);
  const [filters, setFilters] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);

  const setTravelDistance = () => {
    const walkingSpeedKmph = 4.83 / 60;
    const wheelingSpeedKmph = 4.22 / 60;

    let distanceKm;
    if (transportMode === "walking") {
      distanceKm = walkingSpeedKmph * selectedTravelDuration;
    } else if (transportMode === "wheeling") {
      distanceKm = wheelingSpeedKmph * selectedTravelDuration;
    } else {
      throw new Error("Unable to set distance: invalid mode of transport");
    }
    setSelectedDistance(distanceKm);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoriesApi.getCategories();
        setSelectedCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        const typesResponse = await typesApi.getTypes();
        setSelectedTypes(typesResponse.data);
      } catch (error) {
        console.error("Error fetching types data:", error);
      }
    };
    fetchCategories();
    fetchTypes();
  }, []);

  useEffect(() => {
    setFilters({
      accessibilityCriteria: selectedAccessibilities.map(
        (accessibility) => accessibility.criteria
      ),
      categoryIds: selectedCategories.map((category) => category._id),
      typeIds: selectedTypes.map((type) => type._id),
      selectedDistance,
      searchTerm,
      selectedDistance,
      showNoReviews,
      showMixedReviews,
    });
  }, [
    selectedAccessibilities,
    selectedCategories,
    selectedTypes,
    searchTerm,
    location,
    selectedDistance,
    showNoReviews,
    showMixedReviews,
  ]);

  useEffect(() => {
    if (selectedTravelDuration && transportMode) setTravelDistance();
  }, [selectedTravelDuration, transportMode]);

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
        transportMode,
        setTransportMode,
        selectedTravelDuration,
        setSelectedTravelDuration,
        showNoReviews,
        setShowNoReviews,
        showMixedReviews,
        setShowMixedReviews,
        selectedTypes,
        setSelectedTypes,
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
