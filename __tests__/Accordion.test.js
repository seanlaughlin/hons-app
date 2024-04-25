import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react-native";
import Accordion from "../components/Accordion";
import AppText from "../components/AppText";

describe("Accordion component", () => {
  it("renders correctly with default props", () => {
    const { getByText, getByTestId } = render(<Accordion title="Title" />);
    const titleElement = getByText("Title");
    expect(titleElement).toBeTruthy();
    const chevronIcon = getByTestId("chevron-icon");
    expect(chevronIcon.children[0].props.name).toBe("chevron-right");
  });

  it("expands when clicked", () => {
    const { getByTestId } = render(<Accordion title="Title" />);
    const accordionHeader = getByTestId("accordion-header");
    fireEvent.press(accordionHeader);
    const chevronIcon = getByTestId("chevron-icon");
    const accordionContent = getByTestId("accordion-content");
    expect(chevronIcon.children[0].props.name).toBe("chevron-down");
    expect(accordionContent).toBeTruthy();
  });

  it("collapses when clicked twice", () => {
    const { getByTestId, queryByTestId } = render(<Accordion title="Title" />);
    const accordionHeader = getByTestId("accordion-header");
    fireEvent.press(accordionHeader);
    fireEvent.press(accordionHeader);
    const chevronIcon = getByTestId("chevron-icon");
    const accordionContent = queryByTestId("accordion-content");
    expect(chevronIcon.children[0].props.name).toBe("chevron-right");
    expect(accordionContent).toBeNull();
  });

  it("renders children when expanded", () => {
    const { getByTestId, getByText } = render(
      <Accordion title="Title" expanded={true}>
        <AppText>Child Component</AppText>
      </Accordion>
    );

    const accordionContent = getByTestId("accordion-content");
    expect(accordionContent).toBeTruthy();

    const childComponent = getByText("Child Component");
    expect(childComponent).toBeTruthy();
  });
});
