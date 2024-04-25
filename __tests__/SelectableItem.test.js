import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SelectableItem from "../components/SelectableItem";
import AppText from "../components/AppText";
import colors from "../config/colors";

describe("SelectableItem component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <SelectableItem onPress={() => {}} isSelected={false}>
        <AppText>Item Label</AppText>
      </SelectableItem>
    );
    expect(getByText("Item Label")).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <SelectableItem onPress={onPressMock} isSelected={false} />
    );
    const item = getByTestId("selectable-item");
    fireEvent.press(item);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("renders checkbox with correct color based on isSelected prop", () => {
    const { getByTestId } = render(
      <SelectableItem onPress={() => {}} isSelected={true} />
    );
    const checkbox = getByTestId("checkbox");
    expect(checkbox.props.style[3].backgroundColor).toEqual(colors.green);
  });
});
