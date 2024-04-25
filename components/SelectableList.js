import React from "react";
import { ScrollView, StyleSheet, View, Button } from "react-native";
import { useFormikContext } from "formik";
import SelectableItem from "./SelectableItem";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemSeparator from "./ListItemSeparator";
import ActivityIndicator from "./ActivityIndicator";

const SelectableList = ({ name, data, iconMapping }) => {
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
    <View style={styles.container} testID="selectable-list">
      {data.length === 0 || data === null ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator visible={true} size={100} />
        </View>
      ) : (
        <>
          <View style={styles.buttonsContainer}>
            <Button
              title="Select All"
              color={colors.primary}
              onPress={handleSelectAll}
            />
            <View style={styles.verticalDivider} />
            <Button
              title="Select None"
              color={colors.primary}
              onPress={handleSelectNone}
            />
          </View>
          <ScrollView style={styles.scrollView}>
            {data.map((item) => (
              <View key={item.name}>
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
                <ListItemSeparator />
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.light,
    width: "100%",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
});

export default SelectableList;
