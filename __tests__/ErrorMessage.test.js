import React from "react";
import { render } from "@testing-library/react-native";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage component", () => {
  it("does not render when error is empty", () => {
    const { queryByText } = render(<ErrorMessage error="" visible={true} />);
    const errorMessage = queryByText(/./);
    expect(errorMessage).toBeNull();
  });

  it("does not render when visible is false", () => {
    const { queryByText } = render(
      <ErrorMessage error="This is an error" visible={false} />
    );
    const errorMessage = queryByText(/./);
    expect(errorMessage).toBeNull();
  });

  it("renders error message when both error and visible are true", () => {
    const errorMessageText = "This is an error message";
    const { getByText } = render(
      <ErrorMessage error={errorMessageText} visible={true} />
    );
    const errorMessage = getByText(errorMessageText);
    expect(errorMessage).toBeTruthy();
  });
});
