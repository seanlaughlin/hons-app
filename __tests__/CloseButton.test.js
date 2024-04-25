import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CloseButton from "../components/CloseButton";

describe("CloseButton component", () => {
  it("renders close button", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CloseButton action={onPressMock} testID="close-button" />
    );

    const closeButton = getByTestId("close-button");
    expect(closeButton).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CloseButton action={onPressMock} testID="close-button" />
    );

    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);
    expect(onPressMock).toHaveBeenCalled();
  });
});
