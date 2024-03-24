import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import accessibilityIconMapping from "../config/accessibilityIconMapping";

import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";

function VenueInfoAccessItem({ item, onPress, ...others }) {
  const iconColour =
    item.reportedFor > 0 && item.reportedAgainst === 0
      ? colors.green
      : colors.warning;

  const hasReviews = !(item.reportedFor === 0 && item.reportedAgainst === 0);

  return (
    <View style={styles.container} {...others}>
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name={accessibilityIconMapping[item.criteria]}
            size={35}
            color={iconColour}
            accessibilityElementsHidden={true}
          />
          <MaterialCommunityIcons
            name={iconColour === colors.green ? "check-circle" : "alert"}
            size={35}
            color={iconColour}
            accessibilityElementsHidden={true}
          />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <AppText
              style={{ fontSize: 18 }}
              accessibilityHint={
                iconColour == colors.green
                  ? `Confirmed by ${item.reportedFor} users`
                  : hasReviews
                  ? `Mixed reviews (${(
                      (item.reportedFor /
                        (item.reportedFor + item.reportedAgainst)) *
                      100
                    ).toFixed(0)}% agree)`
                  : "No reviews"
              }
            >
              {item.name}
            </AppText>
            <AppText
              style={{ fontSize: 12 }}
              accessibilityElementsHidden={true}
            >
              {iconColour === colors.green
                ? `Confirmed by ${item.reportedFor} user${
                    item.reportedFor > 1 ? "s" : ""
                  }`
                : hasReviews
                ? `Mixed reviews (${(
                    (item.reportedFor /
                      (item.reportedFor + item.reportedAgainst)) *
                    100
                  ).toFixed(0)}% agree)`
                : "No reviews"}
            </AppText>
          </View>
        </View>
      </View>
      {hasReviews && (
        <View
          style={styles.fullInfoContainer}
          accessibilityLabel={`Tap to view full accessibility feedback related to ${item.name}`}
          accessible={true}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={onPress}
          >
            <AppText
              style={{ fontSize: 12 }}
              accessibilityElementsHidden={true}
            >
              View reviews{" "}
            </AppText>

            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={colors.primary}
              accessibilityElementsHidden={true}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  fullInfoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "auto",
    flexDirection: "row",
  },
});

export default VenueInfoAccessItem;
