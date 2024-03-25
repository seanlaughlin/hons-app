import React from "react";
import { View, StyleSheet, Modal } from "react-native";

function AddVenueModal({
  coords,
  address,
  isVisible,
  setIsVisible,
  ...others
}) {
  const handleSubmit = () => {};
  const handleCloseModal = () => {};
  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleCloseModal}
      animationType="slide"
      {...others}
    ></Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddVenueModal;
