import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import Search from "../components/Search";
import Card from "../components/Card";

import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import useLocation from "../hooks/useLocation";
import { useFilterContext } from "../context/FilterContext";

function FindVenueScreen(props) {
  const navigation = useNavigation();
  const location = useLocation();
  const { filters, setSearchTerm } = useFilterContext();

  const getCategoriesApi = useApi(categoriesApi.getCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategoriesApi.request();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    setSearchTerm(null);
  }, []);

  const gotoCategory = (category) => {
    const catName = category.name;
    navigation.navigate("VenueResultsScreen", {
      title: catName,
      filters: {
        categoryIds: [category._id],
        accessibilityCriteria: filters.accessibilityCriteria,
      },
      location,
    });
  };

  const gotoSearchResults = () => {
    console.log(filters);
    navigation.navigate("VenueResultsScreen", {
      title: "Search Results",
      filters,
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Find a Venue</Text>
        <Text style={{ fontSize: 18 }}>
          Search for a service or venue you're looking for in the box below, or
          choose a category.
        </Text>
        <Search
          placeholder={"I'm looking for..."}
          onSubmit={gotoSearchResults}
          accessibilityLabel="Venue search field"
        />
        <FlatList
          data={getCategoriesApi.data}
          keyExtractor={(category) => category.name}
          numColumns={2}
          accessibilityLabel="Venue categories"
          renderItem={({ item }) => (
            <Card
              title={item.title}
              imageUrl={item.imageUri}
              onPress={() => gotoCategory(item)}
              accessibilityLabel={`${item.title} category`}
              accessibilityHint="Press to load venues in this category."
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary,
  },
});

export default FindVenueScreen;
