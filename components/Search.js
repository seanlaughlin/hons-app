import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import colors from "../config/colors";
import SearchFilterModal from "../components/SearchFilterModal";

function Search({ placeholder, onSubmit, ...others }) {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  return (
    <>
      <SearchFilterModal
        isModalVisible={isFilterModalVisible}
        setIsModalVisible={setIsFilterModalVisible}
      />
      <View style={styles.container} {...others}>
        <AppTextInput
          placeholder={placeholder}
          accessibilityLabel="Field for search term"
          accessibilityRole="search"
        ></AppTextInput>
        <View style={styles.buttonContainer}>
          <AppButton
            title="🔎 Search"
            onPress={onSubmit}
            style={styles.button}
            borderColour={colors.secondary}
            accessibilityLabel="Search button"
            accessibilityHint="Press here to search for venues"
          />
          <AppButton
            title="⚙ Filters"
            onPress={handleFilterPress}
            style={styles.button}
            borderColour={colors.secondary}
            accessibilityLabel="Filters button"
            accessibilityHint="Press here to open search filters modal."
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    maxWidth: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
});

export default Search;
