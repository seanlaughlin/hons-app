import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import Search from "../components/Search";
import Card from "../components/Card";
import categories from "../mockdata/categories";

function FindVenueScreen(props) {
  const navigation = useNavigation();

  const gotoCategory = (category) => {
    const catName = category.name;
    console.log(catName);
    navigation.navigate("VenueCategoryScreen", { category: catName });
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
          data={categories}
          keyExtractor={(category) => category.id.toString()}
          numColumns={2}
          accessibilityLabel="Venue categories"
          renderItem={({ item }) => (
            <Card
              title={item.title}
              imageUrl={item.image}
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
