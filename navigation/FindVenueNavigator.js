import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FindVenueScreen from "../screens/FindVenueScreen";
import VenueResultsScreen from "../screens/VenueResultsScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";
import AccessibilityReviewsScreen from "../screens/AccessibilityReviewsScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

const FindVenueNavigator = () => (
  <Stack.Navigator initialRouteName="FindVenueScreen" headerMode="none">
    <Stack.Screen name="FindVenueScreen" component={FindVenueScreen} />
    <Stack.Screen name="VenueResultsScreen" component={VenueResultsScreen} />
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
    <Stack.Screen name="MapScreen" component={MapScreen} />
    <Stack.Screen
      name="AccessibilityReviewsScreen"
      component={AccessibilityReviewsScreen}
    />
  </Stack.Navigator>
);

export default FindVenueNavigator;
