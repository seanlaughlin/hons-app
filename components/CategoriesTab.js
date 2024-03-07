import { View } from "react-native";
import SelectableList from "./SelectableList";

import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import { useEffect } from "react";

const CategoriesTab = () => {
  const allCategories = useApi(categoriesApi.getCategories);

  useEffect(() => {
    allCategories.request();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SelectableList
        name="categories"
        data={allCategories.data}
        title="categories"
      />
    </View>
  );
};

export default CategoriesTab;
