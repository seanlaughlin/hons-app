import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppButton from "../components/AppButton";

describe("AppButton component", () => {
  it("renders correctly with provided title", () => {
    const { getByText } = render(<AppButton title="Test Button" />);
    const button = getByText("Test Button");
    expect(button).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppButton title="Test Button" onPress={onPressMock} />
    );
    const button = getByText("Test Button");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
