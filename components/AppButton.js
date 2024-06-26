import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

//Unsure about button border, off for now
function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  borderColor = colors.secondary,
  ...others
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        style,
        { borderColor: borderColor },
        { borderWidth: 0 },
      ]}
      onPress={onPress}
      {...others}
      accessibilityRole="button"
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    marginHorizontal: 7,

    borderWidth: 2,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppButton;
