import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapNavigator from "./MapNavigator";
import FindVenueNavigator from "./FindVenueNavigator";
import HomeScreen from "../screens/HomeScreen";
import VenueResultsScreen from "../screens/VenueResultsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
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

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name="VenueResultsScreen" component={VenueResultsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
