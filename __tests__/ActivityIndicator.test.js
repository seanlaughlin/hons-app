import React from "react";
import { render } from "@testing-library/react-native";
import ActivityIndicator from "../components/ActivityIndicator";

describe("ActivityIndicator component", () => {
  it("does not render when visible prop is false", () => {
    const { queryByTestId } = render(<ActivityIndicator visible={false} />);
    const activityIndicator = queryByTestId("activity-indicator");
    expect(activityIndicator).toBeNull();
  });

  it("renders when visible prop is true", () => {
    const { getByTestId } = render(<ActivityIndicator visible={true} />);
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator).not.toBeNull();
  });

  it("renders with default props", () => {
    const { getByTestId } = render(<ActivityIndicator visible={true} />);
    const size = 200;
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator.props.style).toHaveProperty("width", size);
    expect(activityIndicator.props.style).toHaveProperty("height", size);
  });

  it("renders with specified size", () => {
    const size = 100;
    const { getByTestId } = render(
      <ActivityIndicator visible={true} size={size} />
    );
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator.props.style).toHaveProperty("width", size);
    expect(activityIndicator.props.style).toHaveProperty("height", size);
  });
});
