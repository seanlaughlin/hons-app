import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
