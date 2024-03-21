import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import colors from "../config/colors";

function AppTextInput({ icon, ...others }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} {...others} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 15,
    borderColor: colors.border,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    width: "100%",
  },
});

export default AppTextInput;
