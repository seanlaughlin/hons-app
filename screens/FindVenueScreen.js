import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  SectionList,
  View,
  ScrollView,
} from "react-native";
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

  const sections = getCategoriesApi.data.map((category) => ({
    title: category.title,
    data: [category],
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Find a Venue</Text>
            <Text style={{ fontSize: 16 }}>
              Search for a service or venue you're looking for in the box below,
              or choose a category.
            </Text>
            <Search
              placeholder={"I'm looking for..."}
              onSubmit={gotoSearchResults}
              accessibilityLabel="Venue search field"
            />
          </View>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                imageUrl={item.imageUri}
                onPress={() => gotoCategory(item)}
                accessibilityLabel={`${item.title} category`}
                accessibilityHint="Press to load venues in this category."
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: colors.light,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: colors.light,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 10,
  },
  contentContainer: {
    paddingHorizontal: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default FindVenueScreen;
