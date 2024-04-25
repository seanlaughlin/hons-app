import React from "react";
import { render } from "@testing-library/react-native";
import AppText from "../components/AppText";
import AppForm from "../components/AppForm";
import * as Yup from "yup";

describe("AppForm component", () => {
  it("renders children components properly", () => {
    const initialValues = { email: "", password: "" };
    const validationSchema = {
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    };
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <AppText testID="child-component">Child Component</AppText>
      </AppForm>
    );

    const childComponent = getByTestId("child-component");
    expect(childComponent).toBeTruthy();
  });

  it("passes correct props to Formik component", () => {
    const initialValues = { email: "", password: "" };
    const validationSchema = {
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    };
    const onSubmit = jest.fn();

    const { findByTestId } = render(
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <AppText testID="child-component">Child Component</AppText>
      </AppForm>
    );

    findByTestId("formik-form").then((formikComponent) => {
      expect(formikComponent.props.initialValues).toEqual(initialValues);
      expect(formikComponent.props.onSubmit).toEqual(onSubmit);
      expect(formikComponent.props.validationSchema).toEqual(validationSchema);
    });
  });
});
