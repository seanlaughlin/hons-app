import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFormikContext } from "formik";
import colors from "../config/colors";

function DropdownList({ items, fieldName, placeholder, style }) {
  const { setFieldValue, values } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setFieldValue(fieldName, value);
  }, [value]);

  return (
    <View style={[style, { zIndex: 50 }]}>
      <DropDownPicker
        open={open}
        value={values[fieldName]}
        items={items.map((item) => ({
          label: item.name,
          value: item.name,
        }))}
        setOpen={setOpen}
        setValue={(option) => {
          setValue(option);
        }}
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
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.border,
    marginBottom: 10,
    width: "100%",
    height: "100%",
  },
});

export default DropdownList;
