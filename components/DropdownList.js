import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../config/colors";

function DropdownList({
  items,
  placeholder,
  style,
  value,
  updateValue,
  clear = null,
}) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState({ ...value });

  useEffect(() => {
    updateValue(localValue);
  }, [localValue]);

  useEffect(() => {
    setLocalValue("");
  }, [clear]);

  return (
    <View style={[style, { zIndex: 50 }, styles.container]}>
      <DropDownPicker
        open={open}
        value={localValue}
        items={items.map((item) => ({
          label: item.name,
          value: item.name,
        }))}
        setOpen={setOpen}
        setValue={setLocalValue}
        style={styles.container}
        textStyle={{ marginLeft: 5 }}
        placeholder={placeholder}
        containerStyle={{
          height: 50,
          width: "100%",
          borderRadius: 25,
        }}
        dropDownContainerStyle={{
          borderColor: colors.border,
          zIndex: 500,
        }}
        placeholderStyle={{
          color: colors.border,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderColor: colors.border,
    marginBottom: 10,
  },
});

export default DropdownList;
