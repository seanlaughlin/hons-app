import React from "react";
import { StyleSheet, Modal, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CloseButton from "./CloseButton";
import AppText from "./AppText";
import colors from "../config/colors";
import HeaderContainer from "./HeaderContainer";
import ImageWithMagnification from "./ImageWithMagnification";

function ReviewModal({ review, isVisible, setIsVisible }) {
  const image = review.image
    ? { uri: process.env.EXPO_PUBLIC_SERVER_URL + "/" + review.image.full }
    : require("../assets/placeholder-square.jpg");

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleCloseModal}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <HeaderContainer
            title="Review"
            button={
              <CloseButton action={handleCloseModal} color={colors.white} />
            }
            style={{
              paddingVertical: 15,
              borderColor: colors.medium,
              borderWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                columnGap: 15,
                padding: 15,
              }}
            >
              <ImageWithMagnification source={image} size={175} />
              <View>
                <View style={{ flexDirection: "row" }}>
                  <AppText>User: </AppText>
                  <AppText style={{ fontWeight: "600" }}>{review.user}</AppText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <AppText>Date: </AppText>
                  <AppText style={{ fontWeight: "600" }}>
                    {new Date(review.date).toLocaleDateString()}
                  </AppText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <AppText>Recommend: </AppText>
                  <AppText style={{ fontWeight: "600" }}>
                    {review.for ? "Yes" : "No"}
                  </AppText>
                </View>
                <MaterialCommunityIcons
                  name={review.for ? "check-circle-outline" : "close-outline"}
                  color={review.for ? colors.green : colors.danger}
                  size={80}
                  style={{ alignSelf: "center", marginTop: 10 }}
                  accessibilityElementsHidden={true}
                />
              </View>
            </View>
            <AppText style={{ alignSelf: "flex-start", marginHorizontal: 15 }}>
              Comment: "{review.comment}"
            </AppText>
          </HeaderContainer>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    margin: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ReviewModal;
