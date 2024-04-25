import React from "react";
import { render } from "@testing-library/react-native";
import AppText from "../components/AppText";

describe("AppText component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<AppText>test text</AppText>);
    const textElement = getByText("test text");
    expect(textElement).toBeTruthy();
  });

  it("renders selectable text", () => {
    const { getByText } = render(<AppText>test text</AppText>);
    const textElement = getByText("test text");
    expect(textElement.props.selectable).toBe(true);
  });
});
