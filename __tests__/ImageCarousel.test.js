import React from "react";
import { render } from "@testing-library/react-native";
import ImageCarousel from "../components/ImageCarousel";

describe("ImageCarousel component", () => {
  const imageUris = ["uri1", "uri2", "uri3"];

  it("renders images from provided image URIs", () => {
    const { getByTestId } = render(<ImageCarousel imageUris={imageUris} />);
    const imageContainer = getByTestId("image-container");
    expect(imageContainer.children.length).toBe(imageUris.length);
  });

  it("renders images with correct URIs", () => {
    const { getByTestId } = render(<ImageCarousel imageUris={imageUris} />);
    const imageContainer = getByTestId("image-container");
    const imageElements = Array.from(imageContainer.children);
    imageElements.forEach((image, index) => {
      expect(image.props.uri).toBe(imageUris[index]);
    });
  });

  it("renders images in horizontal scroll view", () => {
    const { getByTestId } = render(<ImageCarousel imageUris={imageUris} />);
    const scrollView = getByTestId("horizontal-scroll-view");
    expect(scrollView.props.horizontal).toBe(true);
  });
});
