import React from "react";
import { View, StyleSheet } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import colors from "../config/colors";

function Search({ placeholder, onSubmit }) {
  return (
    <View style={styles.container}>
      <AppTextInput placeholder={placeholder}></AppTextInput>
      <View style={styles.buttonContainer}>
        <AppButton
          title="🔎 Search"
          onPress={onSubmit}
          style={styles.button}
          borderColour={colors.secondary}
        />
        <AppButton
          title="⚙ Filters"
          onPress={onSubmit}
          style={styles.button}
          borderColour={colors.secondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    maxWidth: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
});

export default Search;
