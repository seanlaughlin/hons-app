import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import { TouchableWithoutFeedback, View } from "react-native";

const SelectableIcon = ({
  iconName,
  selected,
  onPress,
  title,
  size,
  selectedColor = colors.primary,
  ...others
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      testID="selectable-icon"
      {...others}
    >
      <View style={{ alignItems: "center" }}>
        <MaterialCommunityIcons
          name={iconName}
          size={size}
          color={selected ? selectedColor : colors.medium}
        />
        <AppText
          style={{
            fontSize: 18,
            color: selected ? selectedColor : colors.medium,
          }}
        >
          {title}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectableIcon;
