import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";

import colors from "../config/colors";
import VenueListItem from "../components/VenueListItem";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import BackButton from "../components/BackButton";

import venuesApi from "../api/venues";
import useApi from "../hooks/useApi";
import useLocation from "../hooks/useLocation";
import ListItemSeparator from "../components/ListItemSeparator";

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
        <AppText
          style={{
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          {getFilteredVenues.data.length} matching venues
        </AppText>
      </View>
      <View style={styles.resultBox}>
        {getFilteredVenues.data.length > 0 ? (
          <FlatList
            data={getFilteredVenues.data}
            keyExtractor={(venue) => venue._id.toString()}
            renderItem={({ item }) => <VenueListItem venue={item} />}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            contentContainerStyle={styles.flatListContent}
          />
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
    backgroundColor: colors.light,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    width: "95%",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  resultBox: {
    width: "95%",
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default VenueCategoryScreen;
