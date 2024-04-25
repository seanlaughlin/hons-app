import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FiltersButton from "../components/FiltersButton";
import { FilterContextProvider } from "../context/FilterContext";

describe("FiltersButton component", () => {
  it("renders the button correctly", () => {
    const { getByTestId } = render(
      <FilterContextProvider>
        <FiltersButton />
      </FilterContextProvider>
    );
    const button = getByTestId("filters-button");
    expect(button).toBeTruthy();
  });

  it("opens the filter modal when button is pressed", () => {
    const { getByText, getByTestId } = render(
      <FilterContextProvider>
        <FiltersButton />
      </FilterContextProvider>
    );
    const button = getByText("⚙ Filters");
    fireEvent.press(button);
    const modal = getByTestId("search-filter-modal");
    expect(modal).toBeTruthy();
  });

  it("closes the filter modal when modal is dismissed", () => {
    const { getByText, getByTestId, queryByLabelText } = render(
      <FilterContextProvider>
        <FiltersButton />
      </FilterContextProvider>
    );
    const button = getByText("⚙ Filters");
    fireEvent.press(button);
    const modal = getByTestId("search-filter-modal");
    fireEvent.press(modal);
    const dismissedModal = queryByLabelText("Search Filters Modal");
    expect(dismissedModal).toBeNull();
  });
});
