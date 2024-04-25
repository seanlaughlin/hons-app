import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <View data-testid="formik-form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => <>{children}</>}
      </Formik>
    </View>
  );
};

export default AppForm;
