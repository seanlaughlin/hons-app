import React from "react";
import { render } from "@testing-library/react-native";
import ContentContainer from "../components/ContentContainer";
import { View } from "react-native";

describe("ContentContainer component", () => {
  it("renders children components properly", () => {
    const { getByTestId } = render(
      <ContentContainer>
        <View testID="child-component">Child Component</View>
      </ContentContainer>
    );

    const childComponent = getByTestId("child-component");
    expect(childComponent).toBeTruthy();
  });
});
