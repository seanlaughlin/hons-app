import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native";

function AccessibilityReview({ review, onPress }) {
  const image = review.imageUri
    ? review.imageUri
    : require("../assets/placeholder-square.jpg");

  const icon = review.for ? "check-circle" : "close-circle";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={image}
        style={styles.image}
        accessibilityElementsHidden={true}
      />

      <View style={styles.textContainer}>
        <AppText style={styles.name}>{review.user}</AppText>
        <AppText style={{ fontSize: 15 }}>
          Visited On: {new Date(review.date).toLocaleDateString()}
        </AppText>
        <AppText numberOfLines={1} style={{ fontSize: 15 }}>
          "{review.comment}"
        </AppText>
      </View>
      <MaterialCommunityIcons
        name={icon}
        size={30}
        color={review.for ? colors.green : colors.danger}
        style={{ alignSelf: "center", marginRight: 10 }}
      />
    </TouchableOpacity>
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
    maxHeight: 100,
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
    fontSize: 16,
  },
});

export default AccessibilityReview;
