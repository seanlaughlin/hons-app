import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ImageInput from "../components/ImageInput";
import * as ImagePicker from "expo-image-picker";

jest.mock("expo-image-picker", () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  selectImage: jest.fn(),
}));

describe("ImageInput", () => {
  it("requests permission on mount", async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
      granted: true,
    });

    render(<ImageInput />);
    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  });

  it("selects image when pressed", async () => {
    const onChangeImage = jest.fn();
    const { getByTestId } = render(
      <ImageInput onChangeImage={onChangeImage} />
    );

    fireEvent.press(getByTestId("image-input-container"));

    await waitFor(() => {
      expect(onChangeImage).toHaveBeenCalledWith(imageUri);
    });
  });

  it("deletes image when pressed with existing image", async () => {
    const onChangeImage = jest.fn();
    const imageUri = "fake-uri";
    const { getByTestId } = render(
      <ImageInput imageUri={imageUri} onChangeImage={onChangeImage} />
    );

    fireEvent.press(getByTestId("image-input-container"));

    await waitFor(() => {
      expect(onChangeImage).toHaveBeenCalledWith(null);
    });
  });
});
