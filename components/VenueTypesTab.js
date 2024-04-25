import React, { useEffect } from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

import useApi from "../hooks/useApi";
import typesApi from "../api/types";
import SelectableList from "./SelectableList";

function VenueTypesTab() {
  const { values, setFieldValue } = useFormikContext();
  const selectedCategories = values.categories;
  const selectedTypes = values.types;

  const getTypesByCategories = useApi(typesApi.getTypesByCategories);

  useEffect(() => {
    const categoryIds = selectedCategories.map((category) => category._id);
    getTypesByCategories.request(categoryIds);
  }, [selectedCategories]);

  const handlePress = (item) => {
    const index = selectedTypes.findIndex((type) => type._id === item._id);
    if (index === -1) {
      setFieldValue("types", [...selectedTypes, item]);
    } else {
      const updatedTypes = selectedTypes.filter(
        (type) => type._id !== item._id
      );
      setFieldValue("types", updatedTypes);
    }
  };

  return (
    <View>
      <SelectableList
        name="types"
        data={getTypesByCategories.data}
        title="types"
        onPress={handlePress}
      />
    </View>
  );
}

export default VenueTypesTab;
