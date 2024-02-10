import colors from "./colors";
import { Platform } from "react-native";

export default {
  colors,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Arial" : "Arial",
    color: colors.dark,
  },
};
