import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppText from "./AppText";
import colors from "../config/colors";

function BackButton(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <MaterialCommunityIcons
        name="chevron-left"
        size={30}
        color={colors.primary}
      />
      <AppText>Back</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },
});

export default BackButton;
