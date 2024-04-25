import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AccessTab from "../components/AccessTab";
import { Formik } from "formik";
import { accessCriteriaApi } from "../api/accessCriteria";

jest.mock("../api/accessCriteria", () => ({
  getAccessCriteria: jest.fn(),
}));

describe("AccessTab", () => {
  beforeEach(() => {
    accessCriteriaApi.getAccessCriteria.mockClear();
  });

  it("renders correctly", async () => {
    // Mock the response data
    const mockData = [
      { id: 1, name: "Accessibility 1" },
      { id: 2, name: "Accessibility 2" },
    ];

    accessCriteriaApi.getAccessCriteria.mockResolvedValueOnce({
      data: mockData,
    });

    const { getByText } = render(
      <Formik initialValues={{ showNoReviews: false, showMixedReviews: true }}>
        <AccessTab />
      </Formik>
    );

    // Wait for the SelectableList component to render with mock data
    await waitFor(() => {
      expect(getByText("Accessibility 1")).toBeTruthy();
      expect(getByText("Accessibility 2")).toBeTruthy();
    });
  });

  it("updates checkbox state correctly", async () => {
    // Mock the response data
    const mockData = [
      { id: 1, name: "Accessibility 1" },
      { id: 2, name: "Accessibility 2" },
    ];

    // Mock the API call to return the mock data
    accessCriteriaApi.getAccessCriteria.mockResolvedValueOnce({
      data: mockData,
    });

    const { getByTestId } = render(
      <Formik initialValues={{ showNoReviews: false, showMixedReviews: true }}>
        <AccessTab />
      </Formik>
    );

    // Wait for the SelectableList component to render with mock data
    await waitFor(() => {
      const showNoReviewsCheckbox = getByTestId("checkbox-show-no-reviews");
      const showMixedReviewsCheckbox = getByTestId(
        "checkbox-show-mixed-reviews"
      );

      expect(showNoReviewsCheckbox.props.value).toBeFalsy();
      expect(showMixedReviewsCheckbox.props.value).toBeTruthy();

      fireEvent.press(showNoReviewsCheckbox); // Toggle showNoReviews checkbox
      fireEvent.press(showMixedReviewsCheckbox); // Toggle showMixedReviews checkbox

      expect(showNoReviewsCheckbox.props.value).toBeTruthy();
      expect(showMixedReviewsCheckbox.props.value).toBeFalsy();
    });
  });
});
