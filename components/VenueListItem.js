import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "./AppText";

import colors from "../config/colors";
import { getDistance } from "../utility/mapUtils";
import capitalise from "../utility/capitalise";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { kmToMiles } from "../utility/mapUtils";

function VenueListItem({ venue, ...others }) {
  const navigation = useNavigation();

  const handleVenuePress = () => {
    navigation.navigate("VenueInfoScreen", { venue: venue });
  };
  return (
    <View style={styles.container} {...others}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
        <Image
          source={{ uri: venue.imageUris[0] }}
          style={styles.image}
          accessibilityElementsHidden={true}
        />
        <View style={styles.textContainer}>
          <AppText style={styles.name} numberOfRows={1}>
            {venue.name}
          </AppText>
          <AppText style={styles.otherText}>{capitalise(venue.type)}</AppText>
          <AppText style={styles.otherText}>
            {kmToMiles(venue.distanceToUser)} miles
          </AppText>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <View style={styles.accessIcons}>
          {venue.accessibility.map((access) => {
            if (access.reportedFor > access.reportedAgainst)
              return (
                <MaterialCommunityIcons
                  name={accessibilityIconMapping[access.criteria]}
                  size={28}
                  color={colors.green}
                  accessibilityLabel={access.name}
                />
              );
          })}
        </View>
        <TouchableWithoutFeedback onPress={handleVenuePress}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={40}
            color={colors.medium}
            accessibilityLabel="Go to venue information"
            accessibilityRole="button"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  accessIcons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    columnGap: 5,
  },
  container: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    width: 125,
  },
  otherText: {
    fontSize: 12,
  },
  textContainer: {
    paddingVertical: 10,
  },
});

export default VenueListItem;
