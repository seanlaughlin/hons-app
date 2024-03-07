import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";
import SelectableItem from "./SelectableItem";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectableList = ({ name, data, iconMapping, title }) => {
  const { setFieldValue, values } = useFormikContext();

  const handlePress = (item) => {
    const selectedItems = { ...values[name] }; // Copy the current selected items object

    // Get the selected items for the current tab title or initialize as an empty array
    const selectedItemsForTab = selectedItems[title] || [];

    const index = selectedItemsForTab.findIndex(
      (selectedItem) => selectedItem.name === item.name
    );

    let updatedItems;
    if (index === -1) {
      updatedItems = [...selectedItemsForTab, item];
    } else {
      updatedItems = selectedItemsForTab.filter(
        (selectedItem) => selectedItem.name !== item.name
      );
    }

    // Update the formik values with the updated selected items for the current tab title
    setFieldValue(name, { ...selectedItems, [title]: updatedItems });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SelectableItem
            onPress={() => handlePress(item)}
            isSelected={
              (values[name]?.[title] || []).findIndex(
                (selectedItem) => selectedItem.name === item.name
              ) !== -1
            }
          >
            {iconMapping && (
              <MaterialCommunityIcons
                name={iconMapping[item.criteria]}
                size={30}
                color={colors.green}
              />
            )}
            <AppText style={{ fontSize: 18 }}>{item.title}</AppText>
          </SelectableItem>
        )}
        keyExtractor={(item) => item.name.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default SelectableList;
