import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import AppText from "./AppText";

function ModalAccessItem({ item, ...others }) {
  const iconColor =
    item.reportedFor > 0 && item.reportedAgainst === 0
      ? colors.green
      : colors.warning;
  return (
    <View style={styles.container} {...others}>
      <View testID="accessibility-icon">
        <MaterialCommunityIcons
          name={accessibilityIconMapping[item.criteria]}
          size={30}
          color={iconColor}
          accessibilityElementsHidden={true}
        />
      </View>
      <View testID="status-icon">
        <MaterialCommunityIcons
          name={iconColor === colors.green ? "check-circle" : "alert"}
          size={15}
          color={iconColor}
          accessibilityElementsHidden={true}
        />
      </View>
      <AppText style={{ fontSize: 15 }}> {item.name}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
});

export default ModalAccessItem;
