import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    //Change this to prop
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    //Change this to prop
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AppButton;
