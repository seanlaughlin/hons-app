import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../config/colors";

const SelectableItem = ({ children, onPress, isSelected }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.requirementContainer}>
          {children}
          <View style={styles.checkboxContainer}>
            <Checkbox
              color={isSelected ? colors.green : colors.medium}
              value={isSelected}
              onValueChange={onPress}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  requirementContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    marginLeft: "auto",
  },
});

export default SelectableItem;
