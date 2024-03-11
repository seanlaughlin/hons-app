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
import AppButton from "../components/AppButton";
import HeaderContainer from "../components/HeaderContainer";

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
      <View
        style={{
          paddingHorizontal: 15,
          rowGap: 8,
          flex: 1,
          alignItems: "center",
        }}
      >
        <HeaderContainer
          title={capitalise(title)}
          button={<BackButton color={colors.white} size={40} />}
        >
          <View style={styles.header}>
            <AppText
              style={{
                fontSize: 15,
              }}
            >
              {getFilteredVenues.data.length} matching venues
            </AppText>
          </View>
        </HeaderContainer>
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
        <AppButton
          style={styles.symbolsGuideButton}
          title="💡 Access Symbols Guide"
          accessibilityLabel="Press here for accessibility symbols guide"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    height: "100%",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
  },
  symbolsGuideButton: {
    position: "absolute",
    bottom: 40,
  },
  resultBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default VenueCategoryScreen;
