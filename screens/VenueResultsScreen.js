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
import useLocation from "../hooks/useLocation";

function VenueCategoryScreen(props) {
  const { title, filters = [] } = props.route.params;
  const location = useLocation();
  const getFilteredVenues = useApi(venuesApi.getFilteredVenues);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        await getFilteredVenues.request({ ...filters, location });
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <AppText style={styles.title}>{capitalise(title)}</AppText>
        <AppText style={{ fontSize: 15 }}>
          {getFilteredVenues.data.length} matching venues
        </AppText>
      </View>
      <View style={styles.resultBox}>
        {getFilteredVenues.data.length > 0 ? (
          getFilteredVenues.data.map((venue) => {
            return <VenueListItem venue={venue} key={venue.id} />;
          })
        ) : (
          <AppText>No venues to display.</AppText>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  resultBox: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    width: "95%",
  },
  title: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default VenueCategoryScreen;
