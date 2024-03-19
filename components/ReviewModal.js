import React from "react";
import { StyleSheet, Modal, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CloseButton from "./CloseButton";
import AppText from "./AppText";
import colors from "../config/colors";
import HeaderContainer from "./HeaderContainer";

function ReviewModal({ review, isVisible, setIsVisible }) {
  const imageUri = review.image
    ? review.image
    : "../assets/placeholder-square.jpg";

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
              <Image
                source={require("../assets/placeholder-square.jpg")}
                style={{ width: 180, height: 180, borderRadius: 10 }}
              />
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
            <AppText>Comment: "{review.comment}"</AppText>
          </HeaderContainer>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
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
