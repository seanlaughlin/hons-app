import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ContactInfoModal from "../components/ContactInfoModal";

describe("ContactInfoModal component", () => {
  it("adds contact info when 'Add Contact Info' button is pressed", async () => {
    const onSubmitMock = jest.fn();

    const { getByTestId, getByText } = render(
      <ContactInfoModal
        isVisible={true}
        onClose={() => {}}
        onSubmit={onSubmitMock}
        values={{}}
      />
    );

    const contactMethodDropdown = getByTestId("contact-method-dropdown");
    fireEvent.press(contactMethodDropdown);
    const phoneOption = getByText("phone", { exact: false });
    fireEvent.press(phoneOption);

    const contactDetailsInput = getByTestId("contact-details-input");
    fireEvent.changeText(contactDetailsInput, "123456789");

    const addContactInfoButton = getByTestId("add-contact-info-button");
    fireEvent.press(addContactInfoButton);

    const submitContactInfoButton = getByTestId("submit-contact-info-button");
    fireEvent.press(submitContactInfoButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
