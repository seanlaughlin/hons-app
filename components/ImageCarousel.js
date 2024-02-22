import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageWithMagnification from "./ImageWithMagnification";

function ImageCarousel({ imageUris }) {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <ImageWithMagnification uri={uri} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginHorizontal: 5,
    marginVertical: 20,
    justifyContent: "center",
  },
});

export default ImageCarousel;
