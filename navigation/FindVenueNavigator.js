import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FindVenueScreen from "../screens/FindVenueScreen";
import VenueResultsScreen from "../screens/VenueResultsScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";
import AccessibilityReviewsScreen from "../screens/AccessibilityReviewsScreen";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator initialRouteName="FindVenueScreen" headerMode="none">
    <Stack.Screen name="FindVenueScreen" component={FindVenueScreen} />
    <Stack.Screen name="VenueResultsScreen" component={VenueResultsScreen} />
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
    <Stack.Screen
      name="AccessibilityReviewsScreen"
      component={AccessibilityReviewsScreen}
    />
  </Stack.Navigator>
);

export default MapNavigator;
