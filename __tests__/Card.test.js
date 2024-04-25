import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Card from "../components/Card";

describe("Card component", () => {
  const title = "Test Card";
  const placeholderImageUrl = "../assets/placeholder-square.jpg";
  const imageUrl = "test.jpg";
  const onPress = jest.fn();

  it("renders correctly with title and image", () => {
    const { getByText, getByTestId } = render(
      <Card title={title} imageUrl={imageUrl} onPress={onPress} />
    );

    const titleText = getByText(title);
    expect(titleText).toBeTruthy();

    const image = getByTestId("card-image");
    expect(image.props.source.uri).toBe(imageUrl);
  });

  it("renders placeholder image when no imageUrl provided", () => {
    const { getByTestId } = render(<Card title={title} />);

    const image = getByTestId("card-image");
    expect(image.props.source).toEqual(require(placeholderImageUrl));
  });

  it("calls onPress function when pressed", () => {
    const { getByTestId } = render(
      <Card title={title} imageUrl={imageUrl} onPress={onPress} testID="card" />
    );

    const card = getByTestId("card");
    fireEvent.press(card);

    expect(onPress).toHaveBeenCalled();
  });
});
