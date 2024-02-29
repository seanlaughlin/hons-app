import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MapNavigator from "./MapNavigator";
import FindVenueNavigator from "./FindVenueNavigator";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Find Venue"
      component={FindVenueNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="store-search" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker" color={color} size={30} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
