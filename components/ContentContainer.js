import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function ContentContainer({ children, style, ...others }) {
  return (
    <View style={[styles.container, style]} {...others}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

export default ContentContainer;
