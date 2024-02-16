import React from "react";
import { View, StyleSheet } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import colors from "../config/colors";

function Search({ placeholder, onSubmit }) {
  return (
    <View style={styles.container}>
      <AppTextInput placeholder={placeholder}></AppTextInput>
      <AppButton
        title="🔎 Search"
        onPress={onSubmit}
        style={styles.button}
        borderColour={colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
});

export default Search;
