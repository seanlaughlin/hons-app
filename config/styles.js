import colors from "./colors";
import { Platform } from "react-native";

export default {
  colors,
  text: {
    fontFamily: Platform.OS === "android" ? "Arial" : "Arial",
    color: colors.medium,
  },
};
