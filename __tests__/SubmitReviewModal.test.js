import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SubmitReviewModal from "../components/SubmitReviewModal";
import { VenueContextProvider } from "../context/VenueContext";
import { FilterContextProvider } from "../context/FilterContext";

jest.mock("../hooks/useApi", () => () => ({
  data: [],
  error: null,
  loading: false,
}));

const venueMock = {
  _id: "1",
  name: "Venue Name",
};

describe("SubmitReviewModal component", () => {
  it("renders correctly with default props", () => {
    const { getByText, getByPlaceholderText } = render(
      <FilterContextProvider>
        <VenueContextProvider>
          <SubmitReviewModal
            isModalVisible={true}
            setIsModalVisible={() => {}}
            venue={venueMock}
          />
        </VenueContextProvider>
      </FilterContextProvider>
    );
    expect(getByText("Leave a Review")).toBeTruthy();
    expect(getByText("Leave an access review for Venue Name")).toBeTruthy();
    expect(getByPlaceholderText("Your name (optional)")).toBeTruthy();
    expect(getByText("Select access criteria (required)")).toBeTruthy();
    expect(getByPlaceholderText("Your comments (optional)")).toBeTruthy();
    expect(getByText("📅 Select Date of Visit (required)")).toBeTruthy();
    expect(
      getByText("Did Venue Name meet this access requirement?")
    ).toBeTruthy();
    expect(getByText("Yes")).toBeTruthy();
    expect(getByText("No")).toBeTruthy();
    expect(getByText("Add an image (optional)")).toBeTruthy();
    expect(getByText("✅ Submit Review")).toBeTruthy();
  });

  it("calls handleSubmit when submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <FilterContextProvider>
        <VenueContextProvider>
          <SubmitReviewModal
            isModalVisible={true}
            setIsModalVisible={() => {}}
            venue={venueMock}
          />
        </VenueContextProvider>
      </FilterContextProvider>
    );
    fireEvent.press(getByText("✅ Submit Review"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls handleSelectImage when image is selected", () => {
    const handleSelectImage = jest.fn();
    const { getByTestId } = render(
      <FilterContextProvider>
        <VenueContextProvider>
          <SubmitReviewModal
            isModalVisible={true}
            setIsModalVisible={() => {}}
            venue={venueMock}
          />
        </VenueContextProvider>
      </FilterContextProvider>
    );
    fireEvent.changeText(getByTestId("image-input"), "imageUri");
    expect(handleSelectImage).toHaveBeenCalled();
  });

  it("renders loading modal when isLoading is true", () => {
    const { getByText } = render(
      <FilterContextProvider>
        <VenueContextProvider>
          <SubmitReviewModal
            isModalVisible={true}
            setIsModalVisible={() => {}}
            venue={venueMock}
          />
        </VenueContextProvider>
      </FilterContextProvider>
    );
    fireEvent.changeText(getByText("✅ Submit Review"), "imageUri");
    expect(getByText("Saving...")).toBeTruthy();
  });
});
