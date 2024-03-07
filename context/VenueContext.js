import React, { createContext, useState, useContext } from "react";

const VenueContext = createContext();

export const VenueContextProvider = ({ children }) => {
  const [selectedVenues, setSelectedVenues] = useState([]);

  return (
    <VenueContext.Provider
      value={{
        selectedVenues,
        setSelectedVenues,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => {
  const context = useContext(VenueContext);
  if (!context) {
    throw new Error("useVenues must be used within a VenueContextProvider");
  }
  return context;
};

export default VenueContext;
