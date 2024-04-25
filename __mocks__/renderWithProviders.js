import React from "react";
import { render } from "@testing-library/react-native";
import { FilterContextProvider } from "../context/FilterContext";
import { VenueContextProvider } from "../context/VenueContext";

export const renderWithProviders = (ui, options) => {
  const Wrapper = ({ children }) => (
    <FilterContextProvider>
      <VenueContextProvider>{children}</VenueContextProvider>
    </FilterContextProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};
