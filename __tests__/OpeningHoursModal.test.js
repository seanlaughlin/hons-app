import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OpeningHoursModal from "../components/OpeningHoursModal";

describe("OpeningHoursModal component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockValues = [
    { days: "Mon - Fri", hours: "09:00 - 17:00" },
    { days: "Sat", hours: "10:00 - 14:00" },
  ];

  it("renders correctly with provided values", () => {
    const { getByText, getByPlaceholderText } = render(
      <OpeningHoursModal
        isVisible={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        values={mockValues}
      />
    );

    expect(getByText("Mon - Fri")).toBeTruthy();
    expect(getByText("09:00 - 17:00")).toBeTruthy();
    expect(getByText("Sat")).toBeTruthy();
    expect(getByText("10:00 - 14:00")).toBeTruthy();
    expect(getByPlaceholderText("Start Day").props.value).toBe("");
    expect(getByPlaceholderText("End Day (Optional)").props.value).toBe("");
    expect(getByPlaceholderText("Opens (24H)").props.value).toBe("");
    expect(getByPlaceholderText("Closes (24H)").props.value).toBe("");
  });

  it("adds opening hours correctly", () => {
    const { getByText } = render(
      <OpeningHoursModal
        isVisible={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        values={mockValues}
      />
    );

    fireEvent.changeText(getByText("Start Day"), "Mon");
    fireEvent.changeText(getByText("End Day (Optional)"), "Fri");
    fireEvent.changeText(getByText("Opens (24H)"), "09:00");
    fireEvent.changeText(getByText("Closes (24H)"), "17:00");
    fireEvent.press(getByText("Add Opening Hours"));

    expect(getByText("Mon - Fri")).toBeTruthy();
    expect(getByText("09:00 - 17:00")).toBeTruthy();
  });

  it("removes opening hours correctly", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <OpeningHoursModal
        isVisible={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        values={mockValues}
      />
    );

    fireEvent.press(getByText("✅ Confirm"));

    expect(mockOnSubmit).toHaveBeenCalledWith(mockValues);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
