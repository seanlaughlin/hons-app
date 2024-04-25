import React from "react";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import colors from "../config/colors";
import venueIconMapping from "../config/venueIconMapping";

function MapMarker({ type, coords, onPress, ...others }) {
  const markerIcon = venueIconMapping[type?.name] || "map-marker-question";
  return (
    <Marker coordinate={coords} onPress={onPress} testID="marker">
      <View testID="marker-icon">
        <MaterialCommunityIcons
          name={markerIcon}
          size={35}
          color={colors.primary}
        />
      </View>
    </Marker>
  );
}

export default MapMarker;
