import React from "react";
import { render } from "@testing-library/react-native";
import HeaderContainer from "../components/HeaderContainer";
import { View } from "react-native";
import AppText from "../components/AppText";

describe("HeaderContainer component", () => {
  it("renders header container with title", () => {
    const { getByText } = render(<HeaderContainer title="Test Title" />);
    const titleElement = getByText("Test Title");
    expect(titleElement).toBeTruthy();
  });

  it("renders header container with button and title", () => {
    const button = <View testID="test-button" />;
    const { getByTestId } = render(
      <HeaderContainer title="Test Title" button={button} />
    );
    const buttonElement = getByTestId("test-button");
    expect(buttonElement).toBeTruthy();
  });

  it("renders child components", () => {
    const { getByText } = render(
      <HeaderContainer title="Test Title">
        <View>
          <AppText>Child Component</AppText>
        </View>
      </HeaderContainer>
    );
    const childComponent = getByText("Child Component");
    expect(childComponent).toBeTruthy();
  });
});
