import React from "react";
import { useLocation } from "../hooks/useLocation";

const LocationContext = React.createContext();

export function LocationProvider({ children }) {
  const location = useLocation();

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}
