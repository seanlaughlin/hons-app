import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import AppText from "./AppText";

function BackButton({ containerStyle, ...props }) {
  const navigation = useNavigation();

  return (
    <View style={[styles.backButtonContainer, containerStyle]}>
      <TouchableOpacity
        {...props}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons
          name="chevron-left-circle"
          size={30}
          color={colors.primary}
        />
        <AppText style={{ fontSize: 10 }}>Back</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: 70,
    left: 15,
    zIndex: 1,
  },
  backButton: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default BackButton;
