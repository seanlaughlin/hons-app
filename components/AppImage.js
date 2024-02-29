import React from "react";
import { View, StyleSheet } from "react-native";

function AppImage({ ...props }) {
  return <View style={styles.container} {...props}></View>;
}

const styles = StyleSheet.create({
  container: {},
});

export default AppImage;