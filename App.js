import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";
import { SelectedCategoriesProvider } from "./context/SelectedCategoriesContext";
import { SelectedAccessibilitiesProvider } from "./context/SelectedAccessibilitiesContext";

export default function App() {
  return (
    <SelectedCategoriesProvider>
      <SelectedAccessibilitiesProvider>
        <NavigationContainer theme={navigationTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SelectedAccessibilitiesProvider>
    </SelectedCategoriesProvider>
  );
}
