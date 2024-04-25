import React from "react";
import { render } from "@testing-library/react-native";
import ModalAccessItem from "../components/ModalAccessItem";

describe("ModalAccessItem component", () => {
  const mockItem = {
    criteria: "testCriteria",
    name: "Test Access",
    reportedFor: 1,
    reportedAgainst: 0,
  };

  it("renders correct accessibility icon and text for reported access", () => {
    const { getByText, getByTestId } = render(
      <ModalAccessItem item={mockItem} />
    );

    expect(getByTestId("accessibility-icon").children[0]).toBeTruthy();
    expect(getByText("Test Access")).toBeTruthy();
    expect(getByTestId("status-icon").children[0].props.name).toEqual(
      "check-circle"
    );
  });

  it("renders correct accessibility icon and text for unreported access", () => {
    const unreportedItem = { ...mockItem, reportedFor: 0 };

    const { getByText, getByTestId } = render(
      <ModalAccessItem item={unreportedItem} />
    );

    expect(getByTestId("accessibility-icon").children[0]).toBeTruthy();
    expect(getByText("Test Access")).toBeTruthy();
    expect(getByTestId("status-icon").children[0].props.name).toEqual("alert");
  });
});
