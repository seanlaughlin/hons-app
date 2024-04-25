import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VenueInfoAccessItem from "../components/VenueInfoAccessItem";

const mockItem = {
  criteria: "ramp",
  name: "Ramp",
  reportedFor: 5,
  reportedAgainst: 2,
};

describe("VenueInfoAccessItem component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <VenueInfoAccessItem item={mockItem} onPress={() => {}} />
    );
    expect(getByText("Ramp")).toBeTruthy();
    expect(getByText("View reviews")).toBeTruthy();
  });

  it("calls onPress when view reviews is pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <VenueInfoAccessItem item={mockItem} onPress={onPress} />
    );
    fireEvent.press(getByText("View reviews"));
    expect(onPress).toHaveBeenCalled();
  });
});
