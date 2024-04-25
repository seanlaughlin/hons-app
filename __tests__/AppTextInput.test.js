import React from "react";
import { render } from "@testing-library/react-native";
import AppTextInput from "../components/AppTextInput";

describe("AppTextInput component", () => {
  test("renders TextInput within View container", () => {
    const { getByTestId } = render(<AppTextInput testID="app-text-input" />);
    const viewContainer = getByTestId("app-text-input");
    const textInput = viewContainer.findByType("TextInput");
    expect(textInput).toBeTruthy();
  });

  test("passes other props correctly", () => {
    const onChangeText = jest.fn();
    const placeholder = "Enter your text";
    const { getByPlaceholderText } = render(
      <AppTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        testID="app-text-input"
      />
    );
    const textInput = getByPlaceholderText(placeholder);
    expect(textInput.props.onChangeText).toBe(onChangeText);
  });
});
