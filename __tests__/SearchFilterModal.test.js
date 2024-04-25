import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FilterContextProvider } from "../context/FilterContext";
import SearchFilterModal from "../components/SearchFilterModal";

describe("SearchFilterModal component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <FilterContextProvider>
        <SearchFilterModal isModalVisible={true} setIsModalVisible={() => {}} />
      </FilterContextProvider>
    );
    expect(getByText("Search Filters")).toBeTruthy();
  });

  it("closes modal when close button is pressed", () => {
    const setIsModalVisible = jest.fn();
    const { getByTestId } = render(
      <FilterContextProvider>
        <SearchFilterModal
          isModalVisible={true}
          setIsModalVisible={setIsModalVisible}
        />
      </FilterContextProvider>
    );
    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);
    expect(setIsModalVisible).toHaveBeenCalledWith(false);
  });
});
