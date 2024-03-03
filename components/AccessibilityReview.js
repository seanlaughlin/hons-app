import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function AccessibilityReview({ review }) {
  const image =
    review.image.length > 0
      ? review.image[0]
      : require("../assets/placeholder-square.jpg");

  const icon = review.for ? "check-circle" : "close-circle";

  const handlePress = () => {};

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        accessibilityElementsHidden={true}
      />

      <View style={styles.textContainer}>
        <AppText style={styles.name}>{review.user}</AppText>
        <AppText>Visited On: {review.date.toLocaleDateString()}</AppText>
        <AppText numberOfLines={2}>"{review.comments}"</AppText>
      </View>
      <MaterialCommunityIcons
        name={icon}
        size={30}
        color={review.for ? colors.green : colors.danger}
        style={{ alignSelf: "center", marginRight: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: colors.light,
    overflow: "hidden",
    borderRadius: 10,
    borderColor: colors.border,
    borderWidth: 1,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    rowGap: 5,
    paddingVertical: 10,
  },
  name: {
    fontWeight: "bold",
  },
});

export default AccessibilityReview;
