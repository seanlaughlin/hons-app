import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MapModal from "../components/MapModal";
import { NavigationContainer } from "@react-navigation/native";

describe("MapModal component", () => {
  const mockVenue = {
    name: "Test Venue",
    type: { title: "Test Type" },
    neighbourhood: "Test Neighbourhood",
    coords: { latitude: 40.7128, longitude: -74.006 },
    openingHours: [{ _id: "1", days: "Mon-Fri", hours: "9am-5pm" }],
    contact: { phone: "1234567890" },
    accessibility: [
      {
        criteria: "1",
        name: "Test Access 1",
        reportedFor: 1,
        reportedAgainst: 0,
      },
      {
        criteria: "2",
        name: "Test Access 2",
        reportedFor: 0,
        reportedAgainst: 1,
      },
    ],
    imageUris: [{ full: "test.jpg" }],
  };

  const mockHandleStartNavigation = jest.fn();
  const mockSetIsModalVisible = jest.fn();

  it("renders venue information correctly", () => {
    const { getByText, getByLabelText } = render(
      <NavigationContainer>
        <MapModal
          venue={mockVenue}
          isModalVisible={true}
          setIsModalVisible={mockSetIsModalVisible}
          handleStartNavigation={mockHandleStartNavigation}
        />
      </NavigationContainer>
    );

    expect(getByText("Test Venue")).toBeTruthy();
    expect(getByText("Opening Hours")).toBeTruthy();
    expect(getByText("Mon-Fri: 9am-5pm")).toBeTruthy();
    expect(getByText("Tel: 1234567890")).toBeTruthy();
    expect(getByText("📖 Full Info")).toBeTruthy();
    expect(getByText("🗺 Directions")).toBeTruthy();
  });

  it("invokes handleStartNavigation when 'Directions' button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <MapModal
          venue={mockVenue}
          isModalVisible={true}
          setIsModalVisible={mockSetIsModalVisible}
          handleStartNavigation={mockHandleStartNavigation}
        />
      </NavigationContainer>
    );

    fireEvent.press(getByText("🗺 Directions"));
    expect(mockHandleStartNavigation).toHaveBeenCalledTimes(1);
  });

  it("invokes setIsModalVisible when '📖 Full Info' button is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <MapModal
          venue={mockVenue}
          isModalVisible={true}
          setIsModalVisible={mockSetIsModalVisible}
          handleStartNavigation={mockHandleStartNavigation}
        />
      </NavigationContainer>
    );

    fireEvent.press(getByText("📖 Full Info"));
    expect(mockSetIsModalVisible).toHaveBeenCalledWith(false);
  });
});
