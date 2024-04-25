import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AccessibilityReview from "../components/AccessibilityReview";

describe("AccessibilityReview", () => {
  const date = new Date().toISOString();

  const review = {
    user: "John Doe",
    date: date,
    comment: "Test comment",
    for: true,
    accessCriteria: "wheelchair",
  };

  it("renders correctly", () => {
    const { getByText } = render(<AccessibilityReview review={review} />);
    const userName = getByText("John Doe");
    const visitedOn = getByText(
      `Visited On: ${new Date(review.date).toLocaleDateString()}`
    );
    const comment = getByText(`"${review.comment}"`);
    const icon = review.for ? "check-circle" : "close-circle";

    expect(userName).toBeTruthy();
    expect(visitedOn).toBeTruthy();
    expect(comment).toBeTruthy();
    expect(icon).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <AccessibilityReview review={review} onPress={onPressMock} />
    );
    const container = getByTestId("accessibility-review-container");
    fireEvent.press(container);
    expect(onPressMock).toHaveBeenCalled();
  });
});
