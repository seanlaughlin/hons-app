import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageWithMagnification from "./ImageWithMagnification";

function ImageCarousel({ imageUris, ...others }) {
  return (
    <ScrollView horizontal>
      <View style={styles.container} {...others}>
        {imageUris.map((uri, index) => (
          <ImageWithMagnification
            uri={uri}
            key={index}
            accessibilityElementsHidden={true}
          />
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
