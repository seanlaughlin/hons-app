import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import FindVenueScreen from "./screens/FindVenueScreen";
import MapScreen from "./screens/MapScreen";
import MapModal from "./components/MapModal";

export default function App() {
  return <MapScreen />;
}
