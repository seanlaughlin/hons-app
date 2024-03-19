import React from "react";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import venueIconMapping from "../config/venueIconMapping";

function MapMarker({ type, coords, onPress, ...others }) {
  const markerIcon = venueIconMapping[`${type}`];
  return (
    <Marker coordinate={coords} onPress={onPress} {...others}>
      <MaterialCommunityIcons
        name={markerIcon}
        size={35}
        color={colors.primary}
        {...others}
      />
    </Marker>
  );
}

export default MapMarker;
