import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  borderColor = colors.secondary,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        style,
        { borderColor: borderColor },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,

    borderWidth: 2,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppButton;
