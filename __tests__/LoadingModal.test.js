import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoadingModal from "../components/LoadingModal";

describe("LoadingModal component", () => {
  it("renders correctly when visible", () => {
    const { getByTestId } = render(
      <LoadingModal
        isLoading={true}
        message="Loading..."
        isVisible={true}
        setIsVisible={() => {}}
      />
    );
    const modal = getByTestId("modal-background");
    expect(modal).toBeTruthy();
  });

  it("displays loading indicator and message when isLoading is true", () => {
    const { getByText } = render(
      <LoadingModal
        isLoading={true}
        message="Loading..."
        isVisible={true}
        setIsVisible={() => {}}
      />
    );
    const loadingIndicator = getByText("Loading...");
    expect(loadingIndicator).toBeTruthy();
  });

  it("displays success animation and outcome message when isLoading is false and outcome is not 'Error'", () => {
    const { getByText } = render(
      <LoadingModal
        isLoading={false}
        outcome="Success"
        isVisible={true}
        setIsVisible={() => {}}
      />
    );
    const successMessage = getByText("Success");
    expect(successMessage).toBeTruthy();
  });

  it("displays error message and close button when outcome is 'Error'", () => {
    const mockSetIsVisible = jest.fn();
    const { getByText } = render(
      <LoadingModal
        isLoading={false}
        outcome="Error"
        isVisible={true}
        setIsVisible={mockSetIsVisible}
      />
    );
    const errorMessage = getByText("An error occurred.");
    expect(errorMessage).toBeTruthy();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(mockSetIsVisible).toHaveBeenCalledTimes(1);
  });
});
