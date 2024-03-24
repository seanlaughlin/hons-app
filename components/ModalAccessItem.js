import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import accessibilityIconMapping from "../config/accessibilityIconMapping";
import AppText from "./AppText";

function ModalAccessItem({ item, ...others }) {
  return (
    <View style={styles.container} {...others}>
      <MaterialCommunityIcons
        name={accessibilityIconMapping[item.criteria]}
        size={30}
        color={colors.green}
        accessibilityElementsHidden={true}
      />
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
