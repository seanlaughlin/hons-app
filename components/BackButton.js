import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";

function BackButton({
  style,
  color = colors.primary,
  size = 30,
  returnTo,
  ...props
}) {
  const navigation = useNavigation();

  const goBack = () => {
    if (returnTo) {
      navigation.navigate(returnTo);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.backButtonContainer, style]}>
      <TouchableOpacity
        {...props}
        style={styles.backButton}
        onPress={goBack}
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
