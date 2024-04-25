import React from "react";
import { render, fireEvent, userEvent } from "@testing-library/react-native";
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
  const blur = jest.fn();

  beforeEach(() => {
    useFormikContext.mockReturnValue({
      setFieldTouched,
      setFieldValue,
      values,
      errors,
      touched,
    });
  });

  it("renders AppTextInput with correct props", () => {
    const { getByTestId } = render(<FormField name="email" />);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "test@example.com");
    expect(setFieldValue).toHaveBeenCalledWith("email", "test@example.com");
  });

  it("sets field value when input changes", () => {
    const { getByTestId } = render(<FormField name="email" />);
    const input = getByTestId("text-input");
    fireEvent.changeText(input, "test@example.com");
    expect(setFieldValue).toHaveBeenCalledWith("email", "test@example.com");
  });

  it("displays error message when field is touched and there is an error", () => {
    touched.email = true;
    const { getByText } = render(<FormField name="email" />);
    expect(getByText("Email is required")).toBeTruthy();
  });

  it("does not display error message when field is touched and there is no error", () => {
    const { queryByText } = render(<FormField name="name" />);
    expect(queryByText("Email is required")).toBeNull();
  });
});
