import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ImageCarousel({ imageUris }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <TouchableOpacity key={uri} onPress={() => handleImagePress(uri)}>
            <Image source={uri} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
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
  image: {
    height: 140,
    width: 140,
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 5,
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

export default ImageCarousel;
