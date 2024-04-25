import React from "react";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function FormField({ name, ...others }) {
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
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        {...others}
        testID="text-input"
      />
      <ErrorMessage
        style={{ color: "red" }}
        error={errors[name]}
        visible={touched[name]}
      />
    </>
  );
}

export default FormField;
