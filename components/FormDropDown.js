import React from "react";
import { View, StyleSheet } from "react-native";
import DropdownList from "./DropdownList";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function FormDropDown({ data, name, placeholder, style }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext();
  return (
    <>
      <DropdownList
        items={data}
        value={values[name]}
        updateValue={(item) => {
          setFieldValue(name, item);
        }}
        placeholder={placeholder}
        onPress={() => setFieldTouched(name)}
        style
        accessibilityRole="combobox"
      />
      <ErrorMessage
        style={{ color: "red" }}
        error={errors[name]}
        visible={touched[name]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormDropDown;
