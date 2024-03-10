import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";

function BackButton({
  containerStyle,
  color = colors.primary,
  size = 30,
  ...props
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.backButtonContainer, containerStyle]}>
      <TouchableOpacity
        {...props}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="chevron-left" size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {},
  backButton: {
    alignItems: "center",
  },
});

export default BackButton;
