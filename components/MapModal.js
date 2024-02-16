import React from "react";
import { View, StyleSheet, Image } from "react-native";
import useLocation from "../hooks/useLocation";
import MapMarker from "../components/MapMarker";
import mapSettings from "../config/mapSettings";
import colors from "../config/colors";
import { Modal } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContentContainer from "../components/ContentContainer";
import { Text } from "react-native";
import AppButton from "../components/AppButton";
import Card from "./Card";

function MapModal({ venue, isModalVisible, setIsModalVisible }) {
  console.log(venue);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal} // For Android back button support
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <MaterialCommunityIcons
            name="close"
            style={styles.closeIcon}
            size={20}
            color={colors.medium}
            onPress={handleCloseModal}
          />
          <Text style={styles.title}>{venue} (0.5 miles away)</Text>
          <Text style={styles.subtitle}>School in Royston</Text>
          <View style={styles.venueInfo}>
            <View
              style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                rowGap: 5,
              }}
            >
              <Image
                style={styles.image}
                source={require("../assets/grocers.jpg")}
              />
              <Text>Opening Hours</Text>
              <Text>dsdfg</Text>
              <Text>dsdfg</Text>
              <Text>dsdfg</Text>
            </View>
            <View style={{ width: "100%", flex: 2 }}></View>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton title="📖 Full Info" />
            <AppButton title="🗺 Directions" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    columnGap: 25,
  },
  closeIcon: {
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 25,
    borderColor: colors.medium,
    borderWidth: 1,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 15,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    alignSelf: "center",
    padding: 15,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
  },
  title: {
    fontSize: 22,

    color: colors.medium,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    color: colors.medium,
  },
  venueInfo: {
    flexDirection: "row",
    height: 250,
  },
});

export default MapModal;
