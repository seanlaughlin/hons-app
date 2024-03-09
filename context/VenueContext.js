import React, { createContext, useContext, useState } from "react";

import venuesApi from "../api/venues";
import { useFilterContext } from "./FilterContext";

const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const { filters } = useFilterContext();

  const fetchVenues = async () => {
    try {
      const result = await venuesApi.getFilteredVenues(filters);
      setVenues(result.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <VenueContext.Provider value={{ venues, fetchVenues }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = () => useContext(VenueContext);
