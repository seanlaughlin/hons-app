import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";
import { getDistance } from "../utility/mapUtils";
import capitalise from "../utility/capitalise";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function VenueListItem({ venue, onPress, location, ...others }) {
  console.log(venue);
  return (
    <View style={styles.container} onPress={onPress} {...others}>
      <Image source={venue.images[0]} style={styles.image} />
      <View>
        <AppText style={styles.name}>{venue.name}</AppText>
        <AppText style={{ fontWeight: 600 }}>{capitalise(venue.type)}</AppText>
        {location && (
          <AppText>
            {(getDistance(location, venue.coords) / 1000).toFixed(2)} km
          </AppText>
        )}
      </View>
      {venue.accessibility.map((access) => {
        if (access.reportedFor > access.reportedAgainst)
          return (
            <MaterialCommunityIcons
              name={accessibilityIconMapping[access.criteria]}
              size={28}
              color={colors.green}
            />
          );
      })}
      <MaterialCommunityIcons
        name="chevron-right"
        size={40}
        color={colors.medium}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
    width: "95%",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 75,
    width: 75,
  },
  name: {
    fontSize: 15,
  },
});

export default VenueListItem;
