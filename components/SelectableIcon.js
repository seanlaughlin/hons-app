import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableWithoutFeedback, View } from "react-native";

const SelectableIcon = ({ iconName, selected, onPress, title }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ alignItems: "center" }}>
        <MaterialCommunityIcons
          name={iconName}
          size={45}
          color={selected ? colors.primary : colors.medium}
        />
        <AppText
          style={{
            fontSize: 20,
            color: selected ? colors.primary : colors.medium,
          }}
        >
          {title}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectableIcon;
