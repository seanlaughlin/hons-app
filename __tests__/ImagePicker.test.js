import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImagePicker from "../components/ImagePicker";
import AppForm from "../components/AppForm";

describe("ImagePicker component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <AppForm initialValues={{ testImages: ["1", "2"] }}>
        <ImagePicker name="testImages" />
      </AppForm>
    );
    expect(getByTestId("image-input-list-container")).toBeTruthy();
  });

  it("adds image when new image input is pressed", async () => {
    const handleAdd = jest.fn();
    const useFormikMock = jest.spyOn(require("formik"), "useFormik");
    useFormikMock.mockReturnValue({
      values: { testImages: [] },
      setFieldValue,
    });

    const { getByTestId } = render(
      <AppForm initialValues={{ testImages: ["1", "2"] }}>
        <ImagePicker name="testImages" />
      </AppForm>
    );
    const imageInput = getByTestId("image-input");
    fireEvent.press(imageInput);
    expect(handleAdd).toHaveBeenCalled();
  });

  it("removes image when existing image input is pressed", async () => {
    const setFieldValue = jest.fn();
    const useFormikMock = jest.spyOn(require("formik"), "useFormik");
    useFormikMock.mockReturnValue({
      values: { testImages: ["image-uri-1", "image-uri-2"] },
      setFieldValue,
    });

    const { getAllByTestId } = render(<ImagePicker name="testImages" />);
    const imageInputs = getAllByTestId("image-input");
    fireEvent.press(imageInputs[0]); // Remove first image
    expect(setFieldValue).toHaveBeenCalled();
  });
});
