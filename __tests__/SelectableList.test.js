import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SelectableList from "../components/SelectableList";
import AppForm from "../components/AppForm";

describe("SelectableList component", () => {
  const mockData = [
    { name: "item1", title: "Item 1", criteria: "criteria1" },
    { name: "item2", title: "Item 2", criteria: "criteria2" },
  ];
  const mockIconMapping = {
    criteria1: "icon1",
    criteria2: "icon2",
  };

  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <AppForm initialValues={{ test: [] }}>
        <SelectableList name="test" data={[]} iconMapping={{}} title="Test" />
      </AppForm>
    );
    expect(getByTestId("selectable-list")).toBeTruthy();
  });

  it("renders select all and select none buttons", () => {
    const { getByText } = render(
      <AppForm initialValues={{ test: [] }}>
        <SelectableList
          name="test"
          data={mockData}
          iconMapping={mockIconMapping}
          title="Test"
        />
      </AppForm>
    );
    expect(getByText("Select All")).toBeTruthy();
    expect(getByText("Select None")).toBeTruthy();
  });
});
