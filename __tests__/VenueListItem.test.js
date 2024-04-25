import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VenueListItem from "../components/VenueListItem";

const mockVenue = {
  name: "Test Venue",
  type: { title: "Test Type" },
  distanceToUser: 10,
  accessibility: [
    { criteria: "ramp", name: "Ramp", reportedFor: 5, reportedAgainst: 2 },
    {
      criteria: "elevator",
      name: "Elevator",
      reportedFor: 3,
      reportedAgainst: 0,
    },
    {
      criteria: "parking",
      name: "Parking",
      reportedFor: 0,
      reportedAgainst: 1,
    },
    {
      criteria: "restroom",
      name: "Restroom",
      reportedFor: 7,
      reportedAgainst: 0,
    },
    {
      criteria: "braille",
      name: "Braille",
      reportedFor: 0,
      reportedAgainst: 0,
    },
  ],
  imageUris: [{ full: "test_image_uri.jpg" }],
};

describe("VenueListItem component", () => {
  test("renders correctly with default props", () => {
    const { getByText, getByLabelText } = render(
      <VenueListItem venue={mockVenue} />
    );
    expect(getByText("Test Venue")).toBeTruthy();
    expect(getByText("Test Type")).toBeTruthy();
    expect(getByText("0.621 miles")).toBeTruthy();
    expect(getByLabelText("Ramp")).toBeTruthy();
    expect(getByLabelText("Elevator")).toBeTruthy();
    expect(getByLabelText("Parking")).toBeTruthy();
    expect(getByLabelText("Restroom")).toBeTruthy();
    expect(getByText("+2")).toBeTruthy();
  });

  test("navigates to venue information screen on press", () => {
    const navigate = jest.fn();
    jest.mock("@react-navigation/native", () => ({
      useNavigation: () => ({ navigate }),
    }));
    const { getByLabelText } = render(<VenueListItem venue={mockVenue} />);
    fireEvent.press(getByLabelText("Go to venue information"));
    expect(navigate).toHaveBeenCalledWith("VenueInfoScreen", {
      venue: mockVenue,
      fromSearch: true,
    });
  });
});
