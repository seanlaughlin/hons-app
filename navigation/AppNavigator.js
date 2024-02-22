import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MapNavigator from "./MapNavigator";
import HomeScreen from "../screens/HomeScreen";
import FindVenueScreen from "../screens/FindVenueScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Find Venue"
      component={FindVenueScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="store-search" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="map-marker" color={color} size={30} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
