import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FindVenueScreen from "../screens/FindVenueScreen";
import VenueCategoryScreen from "../screens/VenueCategoryScreen";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator initialRouteName="FindVenueScreen" headerMode="none">
    <Stack.Screen name="FindVenueScreen" component={FindVenueScreen} />
    <Stack.Screen name="VenueCategoryScreen" component={VenueCategoryScreen} />
  </Stack.Navigator>
);

export default MapNavigator;
