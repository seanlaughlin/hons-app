import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  SectionList,
  View,
  ScrollView,
  Image,
} from "react-native";
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
    console.log(filters);
    navigation.navigate("VenueResultsScreen", {
      title: "Search Results",
      filters,
    });
  };

  const sections =
    getCategoriesApi.data?.map((category) => ({
      title: category.title,
      data: [category],
    })) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <HeaderContainer title="Find a Venue">
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
            <SectionList
              style={{ marginTop: 8 }}
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
});

export default FindVenueScreen;
