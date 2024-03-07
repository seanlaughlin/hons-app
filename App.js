import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";
import { FilterContextProvider } from "./context/FilterContext";
import { VenueContextProvider } from "./context/VenueContext";

export default function App() {
  return (
    <FilterContextProvider>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </FilterContextProvider>
  );
}
