import React from "react";
import AnimatedLottieView from "lottie-react-native";

function ActivityIndicator({ visible = false, size = 200 }) {
  if (!visible) return null;

  return (
    <AnimatedLottieView
      source={require("../assets/animations/loader.json")}
      autoPlay
      loop
      style={{ width: size, height: size }}
    />
  );
}

export default ActivityIndicator;
