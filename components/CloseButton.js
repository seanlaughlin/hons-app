import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function CloseButton({ containerStyle, action, ...props }) {
  return (
    <View style={[styles.closeButtonContainer, containerStyle]}>
      <TouchableOpacity
        {...props}
        style={styles.closeButton}
        onPress={action}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons
          name="close-circle"
          size={30}
          color={colors.primary}
        />
        <AppText style={{ fontSize: 10 }}>Close</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 1,
  },
  closeButton: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default CloseButton;
