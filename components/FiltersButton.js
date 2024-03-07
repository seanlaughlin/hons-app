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
      />
      <AppButton
        title="⚙ Filters"
        onPress={handleFilterPress}
        style={[styles.button, style]}
        borderColour={colors.secondary}
        accessibilityLabel="Filters button"
        accessibilityHint="Press here to open search filters modal."
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
