import React from "react";
import { FlatList, StyleSheet, View, Button } from "react-native";
import { useFormikContext } from "formik";
import SelectableItem from "./SelectableItem";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemSeparator from "./ListItemSeparator";

const SelectableList = ({ name, data, iconMapping, title }) => {
  const { setFieldValue, values } = useFormikContext();

  const handlePress = (item) => {
    const selectedItems = [...values[name]];

    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.name === item.name
    );

    let updatedItems;
    if (index === -1) {
      updatedItems = [...selectedItems, item];
    } else {
      updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem.name !== item.name
      );
    }
    setFieldValue(name, updatedItems);
  };

  const handleSelectAll = () => {
    setFieldValue(name, data);
  };

  const handleSelectNone = () => {
    setFieldValue(name, []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          title="Select All"
          color={colors.white}
          onPress={handleSelectAll}
        />
        <View style={styles.verticalDivider} />
        <Button
          title="Select None"
          color={colors.white}
          onPress={handleSelectNone}
        />
      </View>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <ListItemSeparator />}
        renderItem={({ item }) => (
          <SelectableItem
            onPress={() => handlePress(item)}
            isSelected={
              values[name].findIndex(
                (selectedItem) => selectedItem.name === item.name
              ) !== -1
            }
          >
            {iconMapping && (
              <MaterialCommunityIcons
                name={iconMapping[item.criteria]}
                size={30}
                color={colors.green}
                style={{ marginRight: 10 }}
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: colors.medium,
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
});

export default SelectableList;
