import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "./AppButton";
import SearchFilterModal from "../components/SearchFilterModal";
import colors from "../config/colors";

function FiltersButton({ style }) {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  return (
    <>
      <SearchFilterModal
        isModalVisible={isFilterModalVisible}
        setIsModalVisible={setIsFilterModalVisible}
        testID="search-filter-modal"
      />
      <AppButton
        title="⚙ Filters"
        onPress={handleFilterPress}
        style={[styles.button, style]}
        borderColour={colors.secondary}
        accessibilityLabel="Filters"
        accessibilityHint="Press here to open search filters modal."
        accessibilityRole="button"
        testID="filters-button"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 150,
  },
});

export default FiltersButton;
