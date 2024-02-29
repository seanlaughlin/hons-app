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

function ImageWithMagnification({ uri, ...others }) {
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
        <ImageBackground source={uri} style={styles.image}>
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
          <Image source={selectedImage} style={styles.fullScreenImage} />
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
    width: "90%",
    height: "90%",
    resizeMode: "contain",
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
