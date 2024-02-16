import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

import colors from "../config/colors";

function Card({ title, imageUrl, onPress }) {
  console.log(imageUrl);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={imageUrl} />
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
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 5,
    overflow: "hidden",
    borderColor: colors.medium,
    borderWidth: 1,
    maxWidth: "50%",
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
    fontSize: 15,
    marginBottom: 5,
  },
});

export default Card;
