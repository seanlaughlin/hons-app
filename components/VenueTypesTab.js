import React, { useEffect } from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

import useApi from "../hooks/useApi";
import typesApi from "../api/types";
import SelectableList from "./SelectableList";

function VenueTypesTab() {
  const { values } = useFormikContext();
  const selectedCategories = values.categories;
  let categoryIds = selectedCategories.map((category) => category._id);
  const getTypesByCategories = useApi(typesApi.getTypesByCategories);

  useEffect(() => {
    getTypesByCategories.request(categoryIds);
  }, []);

  useEffect(() => {
    categoryIds = selectedCategories.map((category) => category._id);
    getTypesByCategories.request(categoryIds);
  }, [selectedCategories]);

  return (
    <View>
      <SelectableList
        name="types"
        data={getTypesByCategories.data}
        title="types"
      />
    </View>
  );
}

export default VenueTypesTab;
