import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import Search from "../components/Search";
import Card from "../components/Card";
import ActivityIndicator from "../components/ActivityIndicator";

import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import { useFilterContext } from "../context/FilterContext";
import HeaderContainer from "../components/HeaderContainer";

function FindVenueScreen(props) {
  const navigation = useNavigation();
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
    const catName = category.title;
    navigation.navigate("VenueResultsScreen", {
      title: catName.substring(2), // To remove emoji
      categoryId: category._id,
    });
  };

  const gotoSearchResults = () => {
    navigation.navigate("VenueResultsScreen", {
      title: "Search Results",
      filters,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <HeaderContainer title="Find a Venue" style={{ marginBottom: 10 }}>
            <View style={{ paddingHorizontal: 40, paddingVertical: 10 }}>
              <Text style={{ fontSize: 16 }}>
                Search for a service or venue you're looking for in the box
                below, or choose a category.
              </Text>
              <Search
                placeholder={"I'm looking for..."}
                onSubmit={gotoSearchResults}
                accessibilityLabel="Venue search field"
              />
            </View>
          </HeaderContainer>
          {getCategoriesApi.loading ? (
            <View style={{ alignSelf: "center" }}>
              <ActivityIndicator visible={true} />
            </View>
          ) : (
            <View style={styles.cardContainer}>
              {getCategoriesApi.data.map((category) => (
                <Card
                  key={category._id}
                  title={category.title}
                  imageUrl={category.imageUri}
                  onPress={() => gotoCategory(category)}
                  accessibilityLabel={`${category.title} category`}
                  accessibilityHint="Press to load venues in this category."
                  style={styles.card}
                  accessibilityRole="button"
                />
              ))}
            </View>
          )}
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
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  card: {
    marginBottom: 10,
  },
});

export default FindVenueScreen;
