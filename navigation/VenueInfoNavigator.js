import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VenueInfoScreen from "../screens/VenueInfoScreen";
import AccessibilityReviewsScreen from "../screens/AccessibilityReviewsScreen";

const Stack = createStackNavigator();

const VenueInfoNavigator = () => (
  <Stack.Navigator initialRouteName="VenueInfoScreen" headerMode="none">
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
    <Stack.Screen
      name="AccessibilityReviewsScreen"
      component={AccessibilityReviewsScreen}
    />
  </Stack.Navigator>
);

export default VenueInfoNavigator;
