import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FindVenueScreen from "../screens/FindVenueScreen";
import VenueCategoryScreen from "../screens/VenueCategoryScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";
import AccessibilityReviewsScreen from "../screens/AccessibilityReviewsScreen";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator initialRouteName="FindVenueScreen" headerMode="none">
    <Stack.Screen name="FindVenueScreen" component={FindVenueScreen} />
    <Stack.Screen name="VenueCategoryScreen" component={VenueCategoryScreen} />
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
    <Stack.Screen
      name="AccessibilityReviewsScreen"
      component={AccessibilityReviewsScreen}
    />
  </Stack.Navigator>
);

export default MapNavigator;
