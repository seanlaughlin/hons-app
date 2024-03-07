import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import Search from "../components/Search";
import Card from "../components/Card";

import categoriesApi from "../api/categories";
import useApi from "../hooks/useApi";
import useLocation from "../hooks/useLocation";

function FindVenueScreen(props) {
  const navigation = useNavigation();
  const location = useLocation();

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
  }, []);

  const gotoCategory = (category) => {
    const catName = category.name;
    navigation.navigate("VenueCategoryScreen", {
      title: catName,
      filters: { categoryIds: [category._id] },
      location,
    });
    console.log(location);
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
          onSubmit={() => console.log("submitted search")}
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
