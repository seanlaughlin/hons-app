import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";
import AccessibilityReviewsScreen from "../screens/AccessibilityReviewsScreen";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator
    initialRouteName="MapScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MapScreen" component={MapScreen} />
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
    <Stack.Screen
      name="AccessibilityReviewsScreen"
      component={AccessibilityReviewsScreen}
    />
  </Stack.Navigator>
);

export default MapNavigator;
