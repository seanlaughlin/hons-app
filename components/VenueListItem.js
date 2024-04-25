import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import capitalise from "../utility/capitalise";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import { kmToMiles } from "../utility/mapUtils";
import { useFilterContext } from "../context/FilterContext";

function VenueListItem({ venue, ...others }) {
  const navigation = useNavigation();
  const { selectedAccessibilities } = useFilterContext();

  const filteredAccessibilities = venue.accessibility.filter(
    (access) =>
      selectedAccessibilities.some(
        (selected) => selected.criteria === access.criteria
      ) && access.reportedFor > 0
  );

  const notFilteredAccessibilities = venue.accessibility.filter(
    (access) =>
      !selectedAccessibilities.some(
        (selected) => selected.criteria === access.criteria
      ) && access.reportedFor > 0
  );

  const additionalIconsNeeded =
    filteredAccessibilities.length < 3 ? 3 - filteredAccessibilities.length : 0;

  const handleVenuePress = () => {
    navigation.navigate("VenueInfoScreen", { venue: venue, fromSearch: true });
  };

  return (
    <View style={styles.container} {...others}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
        <Image
          source={
            venue.imageUris.length > 0
              ? {
                  uri:
                    process.env.EXPO_PUBLIC_SERVER_URL +
                    "/" +
                    venue.imageUris[0].full,
                }
              : require("../assets/placeholder-square.jpg")
          }
          style={styles.image}
          accessibilityElementsHidden={true}
        />
        <View style={styles.textContainer}>
          <AppText style={styles.name} numberOfRows={1}>
            {venue.name}
          </AppText>
          <AppText style={styles.otherText}>{venue.type.title}</AppText>
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
        {/* Show max of 3 then text indicating additional criteria exist (+3 etc)*/}
        <View style={styles.accessIcons}>
          {filteredAccessibilities &&
            filteredAccessibilities.slice(0, 3).map((access, index) => {
              return (
                <MaterialCommunityIcons
                  name={accessibilityIconMapping[access.criteria]}
                  size={28}
                  color={
                    access.reportedAgainst === 0 && access.reportedFor !== 0
                      ? colors.green
                      : access.reportedFor !== 0
                      ? colors.warning
                      : colors.dangerdark
                  }
                  accessibilityLabel={access.name}
                  key={index}
                />
              );
            })}

          {notFilteredAccessibilities &&
            notFilteredAccessibilities
              .slice(0, additionalIconsNeeded)
              .map((access, index) => (
                <MaterialCommunityIcons
                  name={accessibilityIconMapping[access.criteria]}
                  size={28}
                  color={
                    access.reportedAgainst === 0 && access.reportedFor !== 0
                      ? colors.green
                      : access.reportedFor !== 0
                      ? colors.warning
                      : colors.danger
                  }
                  accessibilityLabel={access.name}
                  key={index}
                />
              ))}

          {venue.accessibility.filter(
            (access) => access.reportedFor > 0 || access.reportedAgainst > 0
          ).length > 3 && <AppText>+{venue.accessibility.length - 3}</AppText>}
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
    alignItems: "center",
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
  // textContainer: {
  //   paddingVertical: 10,
  // },
});

export default VenueListItem;
