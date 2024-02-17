import React from "react";
import { View, StyleSheet } from "react-native";

function ContentContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default ContentContainer;
