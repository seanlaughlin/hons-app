import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <View style={styles.container} testID="image-input-list-container">
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      >
        {imageUris.map((uri) => (
          <View key={uri} style={styles.image}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
              testID="image-input"
            />
          </View>
        ))}
        <View style={styles.image}>
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
