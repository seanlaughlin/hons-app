import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormField from "../components/FormField";
import { useFormikContext } from "formik";

jest.mock("formik", () => ({
  useFormikContext: jest.fn(),
}));

describe("FormField", () => {
  const setFieldTouched = jest.fn();
  const setFieldValue = jest.fn();
  const values = { email: "" };
  const errors = { email: "Email is required" };
  const touched = { email: false };

  beforeEach(() => {
    useFormikContext.mockReturnValue({
      setFieldTouched,
      setFieldValue,
      values,
      errors,
      touched,
    });
  });

  it("should render FormField correctly", () => {
    const { getByTestId } = render(<FormField name="email" />);
    expect(getByTestId("text-input")).toBeTruthy();
  });

  it("should set field value when input changes", () => {
    const { getByTestId } = render(<FormField name="email" />);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "test@example.com");
    expect(setFieldValue).toHaveBeenCalledWith("email", "test@example.com");
  });
});
