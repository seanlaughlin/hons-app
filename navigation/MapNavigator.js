import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import VenueInfoScreen from "../screens/VenueInfoScreen";

const Stack = createStackNavigator();

const MapNavigator = () => (
  <Stack.Navigator initialRouteName="MapScreen" headerMode="none">
    <Stack.Screen name="MapScreen" component={MapScreen} />
    <Stack.Screen name="VenueInfoScreen" component={VenueInfoScreen} />
  </Stack.Navigator>
);

export default MapNavigator;
