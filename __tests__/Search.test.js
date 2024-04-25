import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Search from "../components/Search";
import { FilterContextProvider } from "../context/FilterContext";

describe("Search component", () => {
  it("renders correctly with placeholder", () => {
    const { getByPlaceholderText } = render(
      <FilterContextProvider>
        <Search placeholder="Enter search term" />
      </FilterContextProvider>
    );
    const input = getByPlaceholderText("Enter search term");
    expect(input).toBeTruthy();
  });

  it("calls onSubmit with search value when search button is pressed", () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <FilterContextProvider>
        <Search placeholder="Enter search term" onSubmit={onSubmit} />
      </FilterContextProvider>
    );
    const input = getByPlaceholderText("Enter search term");
    const searchButton = getByText("🔎 Search");
    fireEvent.changeText(input, "Example search");
    fireEvent.press(searchButton);
    expect(onSubmit).toHaveBeenCalledWith("Example search");
  });
});
