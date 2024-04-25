import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BackButton from "../components/BackButton";
import { NavigationContainer } from "@react-navigation/native";

describe("BackButton component", () => {
  it("navigates back when pressed", () => {
    const navigate = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId } = render(
      <NavigationContainer>
        <BackButton navigation={navigate.goBack} />
      </NavigationContainer>
    );
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(navigate.goBack).toHaveBeenCalled();
  });
  it("navigates to chosen screen when provided", () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId } = render(
      <NavigationContainer>
        <BackButton navigation={navigation.navigate} />
      </NavigationContainer>
    );
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
