import React from "react";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import venueIconMapping from "../config/venueIconMapping";

function MapMarker({ type, coords, onPress }) {
  const markerIcon = venueIconMapping[`${type}`];
  return (
    <Marker coordinate={coords} onPress={onPress}>
      <MaterialCommunityIcons
        name={markerIcon}
        size={40}
        color={colors.primary}
      />
    </Marker>
  );
}

export default MapMarker;
