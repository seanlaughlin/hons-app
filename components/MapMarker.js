import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ContentContainer from "./ContentContainer";
import AppButton from "./AppButton";

function MapMarker({ venueName, coords, icon, onPress }) {
  return (
    <>
      <Marker coordinate={coords} onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={40} color={colors.primary} />
      </Marker>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  content: {
    alignItems: "center",
  },
});

export default MapMarker;
