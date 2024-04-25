import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImageWithMagnification from "../components/ImageWithMagnification";

describe("ImageWithMagnification component", () => {
  it("renders correctly", () => {
    const uri = "https://example.com/image.jpg";
    const { getByTestId } = render(<ImageWithMagnification uri={uri} />);
    const imageComponent = getByTestId("image-with-magnification");
    expect(imageComponent).toBeTruthy();
  });

  it("opens modal when image is pressed", () => {
    const uri = "https://example.com/image.jpg";
    const { getByTestId } = render(<ImageWithMagnification uri={uri} />);
    const imageComponent = getByTestId("image-with-magnification");
    fireEvent.press(imageComponent);
    const modal = getByTestId("modal");
    expect(modal).toBeTruthy();
  });
});
