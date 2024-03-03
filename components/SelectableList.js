import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import SelectableItem from "./SelectableItem";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectableList = ({ name, data, iconMapping, title }) => {
  const { setFieldValue, values } = useFormikContext();

  const handlePress = (item) => {
    const selectedItems = values[name] || [];
    const index = selectedItems.indexOf(item);
    let updatedItems;

    if (index === -1) {
      updatedItems = [...selectedItems, item];
    } else {
      selectedItems.splice(index, 1);
      updatedItems = [...selectedItems];
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSelectAll}>
          <AppText style={styles.link}>Select All</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelectNone}>
          <AppText style={styles.link}>Select None</AppText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SelectableItem
            onPress={() => handlePress(item)}
            isSelected={(values[name] || []).includes(item)}
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    columnGap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: colors.primary,
    fontSize: 16,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default SelectableList;
