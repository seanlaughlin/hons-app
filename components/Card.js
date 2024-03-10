import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

import colors from "../config/colors";

function Card({ title, imageUrl, onPress, ...others }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} {...others}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 8,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Card;
