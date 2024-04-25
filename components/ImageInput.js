import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("You need to enable permission to access the camera roll.");
      }
    } catch (err) {
      console.error("Error requesting permission:", err);
    }
  };

  const handlePress = async () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error selecting image:", err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      testID="image-input-container"
      accessibilityRole="button"
      accessibilityLabel="Tap to choose an image"
    >
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={60}
            color={colors.medium}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default ImageInput;
