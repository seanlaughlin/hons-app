import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import ImageCarousel from "../components/ImageCarousel";
import venues from "../mockdata/venues";

function VenueInfoScreen() {
  const venue = venues[1];
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <AppText style={styles.title}>{venue.name}</AppText>
        <AppText style={{ fontSize: 20 }}>
          {capitalise(venue.type)} in Royston
        </AppText>
        <ImageCarousel imageUris={venue.images} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    color: colors.primary,
  },
});

export default VenueInfoScreen;
