import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SelectableIcon from "../components/SelectableIcon";
import colors from "../config/colors";

describe("SelectableIcon component", () => {
  it("renders correctly with default props", () => {
    const { getByText, getByTestId } = render(
      <SelectableIcon iconName="star" title="Star" testID="selectable-icon" />
    );
    const icon = getByTestId("selectable-icon");
    expect(icon).toBeTruthy();
    expect(getByText("Star")).toBeTruthy();
  });

  it("renders with selected color when 'selected' prop is true", () => {
    const { getByTestId } = render(
      <SelectableIcon
        iconName="star"
        title="Star"
        selected={true}
        testID="selectable-icon"
      />
    );
    const icon = getByTestId("selectable-icon").children[0].children[0];
    console.log(icon);
    expect(icon).pendingProps.color.toEqual(colors.primary);
  });

  it("calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <SelectableIcon
        iconName="star"
        title="Star"
        onPress={onPressMock}
        testID="my-selectable-icon"
      />
    );
    const icon = getByTestId("selectable-icon");
    fireEvent.press(icon);
    expect(onPressMock).toHaveBeenCalled();
  });
});
