import { render } from "@testing-library/react-native";
import CategoriesTab from "../components/CategoriesTab";
import AppForm from "../components/AppForm";

const categories = [
  {
    title: "🏫 Schools",
    name: "schools",
    imageUri: "../assets/school.jpg",
  },
  {
    title: "📚 Libraries",
    name: "libraries",
    imageUri: "../assets/library.jpg",
  },
  {
    title: "🍎 Grocers",
    name: "grocers",
    imageUri: "../assets/grocers.jpg",
  },
  {
    title: "🎾 Sports & Recreation",
    name: "sportsrec",
    imageUri: "../assets/sports.jpg",
  },
  {
    title: "🩺 Medical",
    name: "medical",
    imageUri: "../assets/medical.jpg",
  },
  {
    title: "🚂 Transport",
    name: "transport",
    imageUri: "../assets/transport.jpg",
  },
];

describe("CategoriesTab component", () => {
  it("renders selectable list", async () => {
    const { getByTestId } = render(
      <AppForm initialValues={{ categories: categories }}>
        <CategoriesTab />
      </AppForm>
    );

    const selectableList = getByTestId("selectable-list");
    expect(selectableList).toBeTruthy();
  });
});
