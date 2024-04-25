import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImageInputList from "../components/ImageInputList";

describe("ImageInputList component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<ImageInputList />);
    expect(getByTestId("image-input-list-container")).toBeTruthy();
  });

  test("adds image when new image input is pressed", async () => {
    const onAddImage = jest.fn();
    const { getByTestId } = render(<ImageInputList onAddImage={onAddImage} />);
    const imageInput = getByTestId("image-input");
    fireEvent.press(imageInput);
    expect(onAddImage).toHaveBeenCalled();
  });

  test("removes image when existing image input is pressed", async () => {
    const onRemoveImage = jest.fn();
    const imageUris = ["image-uri-1", "image-uri-2"];
    const { getAllByTestId } = render(
      <ImageInputList imageUris={imageUris} onRemoveImage={onRemoveImage} />
    );
    const imageInputs = getAllByTestId("image-input");
    fireEvent.press(imageInputs[0]); // Remove first image
    expect(onRemoveImage).toHaveBeenCalledWith(imageUris[0]);
  });
});
