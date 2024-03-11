import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function CloseButton({
  containerStyle,
  action,
  color = colors.primary,
  size = 30,
  ...props
}) {
  return (
    <View style={[styles.closeButtonContainer, containerStyle]}>
      <TouchableOpacity
        {...props}
        style={styles.closeButton}
        onPress={action}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="close" size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButtonContainer: {},
  closeButton: {
    alignItems: "center",
  },
});

export default CloseButton;
