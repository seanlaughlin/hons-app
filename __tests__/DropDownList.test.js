import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DropdownList from "../components/DropdownList";

jest.mock("../utility/capitalise", () => ({
  __esModule: true,
  default: jest.fn((name) => name.toUpperCase()),
}));

const items = [{ name: "option1" }, { name: "option2" }, { name: "option3" }];

describe("DropdownList component", () => {
  it("renders dropdown list with given items and placeholder", async () => {
    const placeholder = "Select option";
    const updateValue = jest.fn();

    const { findByText } = render(
      <DropdownList
        items={items}
        placeholder={placeholder}
        value=""
        updateValue={updateValue}
      />
    );

    expect(findByText(placeholder)).toBeTruthy();

    await waitFor(() => {
      items.forEach((item) => {
        const capitalizedItemName = item.name.toUpperCase();
        expect(findByText(capitalizedItemName)).toBeTruthy();
      });
    });
  });

  it("updates value when an item is selected", async () => {
    const updateValue = jest.fn();

    const { getByText, findByText, getByTestId } = render(
      <DropdownList
        items={items}
        placeholder="Select option"
        value=""
        updateValue={updateValue}
        testID="dropdown-list"
      />
    );

    console.log(getByText("Select option"));
    fireEvent.press(getByText("Select option"));
    await waitFor(() => expect(getByTestId("dropdown-list")).toBeTruthy());
    fireEvent.press(await findByText("option1"));

    expect(updateValue).toHaveBeenCalledWith("option1");
  }); //FIX

  it("clears local value when clear prop changes", async () => {
    const { rerender, getByText, findByText } = render(
      <DropdownList
        items={items}
        placeholder="Select option"
        value="option1"
        updateValue={() => {}}
      />
    );

    rerender(
      <DropdownList
        items={items}
        placeholder="Select option"
        value="option2"
        updateValue={() => {}}
      />
    );

    expect(await findByText("Select option")).toBeTruthy();
  });
});
