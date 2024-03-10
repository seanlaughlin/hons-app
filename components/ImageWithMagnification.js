import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ImageWithMagnification({
  uri,
  disableMagnification = false,
  ...others
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <TouchableOpacity
        key={uri}
        onPress={() => handleImagePress(uri)}
        {...others}
      >
        <ImageBackground source={{ uri: uri }} style={styles.image}>
          <View style={styles.imageMagnification}>
            <MaterialCommunityIcons
              name="magnify"
              color={colors.white}
              size={20}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <MaterialCommunityIcons
            style={styles.closeButton}
            name="close"
            size={40}
            onPress={handleCloseModal}
            color={colors.light}
          />
          <View style={styles.fullScreenImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullScreenImage}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 140,
    width: 140,
    borderColor: colors.light,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  imageMagnification: {
    position: "absolute",
    bottom: 3,
    right: 3,
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  fullScreenImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  fullScreenImageContainer: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 1,
  },
  closeText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default ImageWithMagnification;
