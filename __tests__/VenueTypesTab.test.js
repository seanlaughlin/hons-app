import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VenueTypesTab from "../components/VenueTypesTab";
import AppForm from "../components/AppForm";

jest.mock("formik", () => ({
  useFormikContext: () => ({
    values: { categories: [{ _id: "1", name: "Category 1" }] },
    setFieldValue: jest.fn(),
  }),
}));

jest.mock("../hooks/useApi");
jest.mock("../api/types");

describe("VenueTypesTab component", () => {
  test("renders correctly", () => {
    const mockData = [
      { _id: "1", name: "Type 1" },
      { _id: "2", name: "Type 2" },
      { _id: "3", name: "Type 3" },
    ];
    require("../hooks/useApi").default.mockReturnValue({
      data: mockData,
    });
    const { getByText } = render(
      <AppForm
        initialValues={{ categories: [{ _id: "1", name: "Category 1" }] }}
      >
        <VenueTypesTab />
      </AppForm>
    );
    expect(getByText("Type 1")).toBeTruthy();
    expect(getByText("Type 2")).toBeTruthy();
    expect(getByText("Type 3")).toBeTruthy();
  });

  test("updates selected types correctly on press", () => {
    const mockData = [
      { _id: "1", name: "Type 1" },
      { _id: "2", name: "Type 2" },
    ];
    require("../hooks/useApi").default.mockReturnValue({
      data: mockData,
    });
    const { getByText } = render(<VenueTypesTab />);
    fireEvent.press(getByText("Type 1"));
    expect(
      require("formik").useFormikContext().setFieldValue
    ).toHaveBeenCalledWith("types", [{ _id: "1", name: "Type 1" }]);
    fireEvent.press(getByText("Type 1")); // Press again to remove
    expect(
      require("formik").useFormikContext().setFieldValue
    ).toHaveBeenCalledWith("types", []);
  });
});
