import React from "react";
import { View, StyleSheet, SafeAreaView, Text, Image } from "react-native";
import colors from "../config/colors";
import Search from "../components/Search";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";

const categoriesData = [
  {
    id: 1,
    title: "🏫 Schools",
    image: require("../assets/school.jpg"),
  },
  {
    id: 2,
    title: "📚 Libraries",
    image: require("../assets/library.jpg"),
  },
  {
    id: 3,
    title: "🍎 Grocers",
    image: require("../assets/grocers.jpg"),
  },
  {
    id: 4,
    title: "🎾 Sports & Recreation",
    image: require("../assets/sports.jpg"),
  },
  {
    id: 5,
    title: "🩺 Medical",
    image: require("../assets/medical.jpg"),
  },
  {
    id: 6,
    title: "🚂 Transport",
    image: require("../assets/transport.jpg"),
  },
];

function FindVenueScreen(props) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Find a Venue</Text>
        <Text style={{ fontSize: 18 }}>
          Search for a service you're looking for in the box below, or choose a
          category to browse.
        </Text>
        <Search
          placeholder={"I'm looking for..."}
          onSubmit={() => console.log("submitted search")}
        />
        <FlatList
          data={categoriesData}
          keyExtractor={(category) => category.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              imageUrl={item.image}
              onPress={() => console.log(`${item.title} pressed`)}
            />
          )}
        />
      </ScrollView>
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
