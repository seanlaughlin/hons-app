import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import accessibilityIconMapping from "../config/accessibilityIconMapping";

import colors from "../config/colors";
import AppText from "./AppText";

function VenueInfoAccessItem({ item }) {
  console.log(item);
  const iconColour =
    item.reportedFor > 0 && item.reportedAgainst === 0
      ? colors.green
      : colors.warning;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name={accessibilityIconMapping[item.criteria]}
            size={35}
            color={iconColour}
          />
          <MaterialCommunityIcons
            name={iconColour === colors.green ? "check-circle" : "alert"}
            size={35}
            color={iconColour}
          />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <AppText style={{ fontSize: 18 }}>{item.name}</AppText>
            <AppText style={{ fontSize: 12 }}>
              {iconColour === colors.green
                ? `Reported by ${item.reportedFor} user${
                    item.reportedFor > 1 ? "s" : ""
                  }`
                : "Mixed reviews - please check full info"}
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.fullInfoContainer}>
        <AppText style={{ fontSize: 12 }}>View full info</AppText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.medium}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.light,
    borderTopWidth: 1,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 20,
  },
  fullInfoContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "auto",
    flexDirection: "row",
  },
});

export default VenueInfoAccessItem;
