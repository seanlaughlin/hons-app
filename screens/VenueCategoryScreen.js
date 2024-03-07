import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import colors from "../config/colors";
import venues from "../mockdata/venues";
import VenueListItem from "../components/VenueListItem";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import BackButton from "../components/BackButton";
import useLocation from "../hooks/useLocation";
import AppButton from "../components/AppButton";
import FiltersButton from "../components/FiltersButton";

// Refactor to venue results screen to be used with search
function VenueCategoryScreen(props) {
  const { category } = props.route.params;
  const catVenues = venues.filter((venue) => venue.category === category);

  const location = useLocation();

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <AppText style={styles.title}>{capitalise(category)}</AppText>
      <View style={styles.resultBox}>
        {catVenues.length > 0 ? (
          catVenues.map((venue) => {
            return (
              <VenueListItem venue={venue} key={venue.id} location={location} />
            );
          })
        ) : (
          <AppText>No venues to display.</AppText>
        )}
      </View>
      <FiltersButton style={styles.filterButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
  filterButton: {
    position: "absolute",
    bottom: 10,
  },
  resultBox: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    width: "95%",
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    marginBottom: 20,
  },
});

export default VenueCategoryScreen;
