import React from "react";
import { StyleSheet, Modal, View } from "react-native";
import ActivityIndicator from "./ActivityIndicator";
import LottieView from "lottie-react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import AppButton from "./AppButton";

function LoadingModal({
  isLoading,
  message,
  outcome,
  isVisible,
  setIsVisible,
}) {
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
      <View style={styles.modalBackground} testID="modal-background">
        <View style={styles.modalContainer}>
          <View style={styles.loadingContainer}>
            {isLoading && (
              <View style={{ alignItems: "center" }}>
                <ActivityIndicator visible={true} size={100} />
                <AppText>{message}</AppText>
              </View>
            )}
            {!isLoading && outcome !== "Error" && (
              <View style={{ alignItems: "center" }}>
                <LottieView
                  source={require("../assets/animations/done.json")}
                  autoPlay
                  loop={false}
                  style={styles.animation}
                  speed={0.7}
                  onAnimationFinish={handleCloseModal}
                />
                <AppText>{outcome}</AppText>
              </View>
            )}
            {outcome === "Error" && (
              <>
                <AppText style={{ marginHorizontal: 5 }}>
                  An error occurred.
                </AppText>
                <AppButton title="Close" onPress={setIsVisible(false)} />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 80,
    height: 80,
  },
  loadingContainer: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default LoadingModal;
