import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DistanceTab from "../components/DistanceTab";
import AppForm from "../components/AppForm";

describe("DistanceTab component", () => {
  it("renders slider and selectable icons properly", () => {
    const { getByText, getByTestId } = render(
      <AppForm
        initialValues={{ modeOfTransport: "walking", travelDuration: 10 }}
      >
        <DistanceTab />
      </AppForm>
    );

    expect(getByText("5 min")).toBeTruthy();
    expect(getByText("60 min")).toBeTruthy();
    expect(getByText("Walking")).toBeTruthy();
    expect(getByText("Wheeling")).toBeTruthy();

    const slider = getByTestId("slider");
    expect(slider).toBeTruthy();
    expect(slider.props.minimumValue).toEqual(5);
    expect(slider.props.maximumValue).toEqual(60);

    const walkingIcon = getByTestId("walking-icon").children[0];
    const wheelingIcon = getByTestId("wheeling-icon").children[0];
    expect(walkingIcon).toBeTruthy();
    expect(wheelingIcon).toBeTruthy();

    fireEvent(slider, "valueChange", 30);
    expect(getByText("30 minutes")).toBeTruthy();
  });
});
