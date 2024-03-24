import React, { createContext, useContext, useState, useEffect } from "react";

import venuesApi from "../api/venues";
import { useFilterContext } from "./FilterContext";
import useLocation from "../hooks/useLocation";

const VenueContext = createContext();

export const VenueContextProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [mapVenues, setMapVenues] = useState([]);
  const { filters } = useFilterContext();
  const location = useLocation();

  const fetchVenues = async () => {
    try {
      const result = await venuesApi.getFilteredVenues({
        ...filters,
        maxDistance: filters.selectedDistance,
        location,
      });
      setVenues(result.data);
      const mapResult = await venuesApi.getFilteredVenues({
        ...filters,
        maxDistance: filters.selectedDistance,
        location,
        searchTerm: "",
      });
      setMapVenues(mapResult.data);
    } catch (error) {
      console.error("Error fetching map venues:", error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [filters]);

  return (
    <VenueContext.Provider value={{ venues, fetchVenues, mapVenues }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error(
      "useVenueContext must be used within a VenueContextProvider"
    );
  }
  return context;
};
