import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddVenueModal from "../components/AddVenueModal";
import { VenueContextProvider } from "../context/VenueContext";
import { FilterContextProvider } from "../context/FilterContext";
import { renderWithProviders } from "../__mocks__/renderWithProviders";

describe("AddVenueModal component", () => {
  it("renders correctly with default props", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <FilterContextProvider>
        <VenueContextProvider>
          <AddVenueModal isVisible={true} address="test" />
        </VenueContextProvider>
      </FilterContextProvider>
    );

    const titleElement = getByText("Add a New Venue");
    expect(titleElement).toBeTruthy();

    const nameInput = getByPlaceholderText("Venue name (required)");
    expect(nameInput).toBeTruthy();

    const addressInput = getByPlaceholderText("Venue address (required)");
    expect(addressInput).toBeTruthy();

    const neighbourhoodInput = getByPlaceholderText("Neighbourhood (required)");
    expect(neighbourhoodInput).toBeTruthy();
  });

  it("opens and closes opening hours modal", () => {
    let modalVisible = true;
    const handleClose = jest.fn();

    const { getByTestId } = renderWithProviders(
      <AddVenueModal isVisible={modalVisible} onClose={handleClose} />
    );

    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
