import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ReviewModal from "../components/ReviewModal";

describe("ReviewModal component", () => {
  const mockReview = {
    user: "John Doe",
    date: new Date("2022-04-01").toISOString(),
    for: true,
    comment: "This is a test comment",
    image: { full: "test_image.jpg" },
  };

  test("renders correctly with provided review", () => {
    const { getByText, getByTestId } = render(
      <ReviewModal
        review={mockReview}
        isVisible={true}
        setIsVisible={() => {}}
      />
    );

    expect(getByText("Review")).toBeTruthy();
    expect(getByText("User:")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    //DATE DOESNT WORK - FIX
    expect(getByText("Recommend:")).toBeTruthy();
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText('Comment: "This is a test comment"')).toBeTruthy();
    expect(getByTestId("image-with-magnification")).toBeTruthy();
  });

  test("closes the modal when close button is pressed", () => {
    const mockSetIsVisible = jest.fn();
    const { getByTestId } = render(
      <ReviewModal
        review={mockReview}
        isVisible={true}
        setIsVisible={mockSetIsVisible}
      />
    );

    fireEvent.press(getByTestId("close-button"));
    expect(mockSetIsVisible).toHaveBeenCalledTimes(1);
    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });
});
