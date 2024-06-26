import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import colors from "../config/colors";
import FiltersButton from "./FiltersButton";
import { useFilterContext } from "../context/FilterContext";

function Search({ placeholder, onSubmit, ...others }) {
  const { setSearchTerm } = useFilterContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async () => {
    if (searchValue !== "") {
      setSearchTerm(searchValue);
    } else {
      setSearchTerm("");
    }
    onSubmit(searchValue);
  };

  return (
    <View style={styles.container} {...others}>
      <AppTextInput
        placeholder={placeholder}
        accessibilityLabel="Field for search term"
        accessibilityRole="search"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          title="🔎 Search"
          onPress={handleSearch}
          style={styles.button}
          borderColour={colors.secondary}
          accessibilityLabel="Search button"
          accessibilityHint="Press here to search for venues"
        />
        <FiltersButton />
      </View>
    </View>
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
    marginTop: 10,
    flexDirection: "row",
  },
});

export default Search;
