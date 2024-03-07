import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import colors from "../config/colors";
import VenueListItem from "../components/VenueListItem";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import BackButton from "../components/BackButton";
import FiltersButton from "../components/FiltersButton";

import venuesApi from "../api/venues";
import useApi from "../hooks/useApi";

function VenueCategoryScreen(props) {
  const { title, filters = [], location } = props.route.params;

  const getFilteredVenues = useApi(venuesApi.getFilteredVenues);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        await getFilteredVenues
          .request({ ...filters, location })
          .then(console.log(getFilteredVenues));
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <AppText style={styles.title}>{capitalise(title)}</AppText>
      <View style={styles.resultBox}>
        {getFilteredVenues.data.length > 0 ? (
          getFilteredVenues.data.map((venue) => {
            return <VenueListItem venue={venue} key={venue.id} />;
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
