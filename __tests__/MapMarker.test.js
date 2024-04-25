import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MapMarker from "../components/MapMarker";

describe("MapMarker component", () => {
  const mockCoords = { latitude: 40.7128, longitude: -74.006 };
  const mockType = { name: "bakery" };
  const mockOnPress = jest.fn();

  it("renders correct marker icon based on type", () => {
    const { getByTestId } = render(
      <MapMarker type={mockType} coords={mockCoords} onPress={mockOnPress} />
    );
    const markerIcon = getByTestId("marker-icon");
    expect(markerIcon.children[0].props.name).toEqual("bread-slice");
  });

  it("invokes onPress function when marker is pressed", () => {
    const { getByTestId } = render(
      <MapMarker type={mockType} coords={mockCoords} onPress={mockOnPress} />
    );
    const marker = getByTestId("marker");
    fireEvent.press(marker);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
