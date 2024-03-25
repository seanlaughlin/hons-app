import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";

import colors from "../config/colors";
import VenueListItem from "../components/VenueListItem";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import BackButton from "../components/BackButton";

import ListItemSeparator from "../components/ListItemSeparator";
import AppButton from "../components/AppButton";
import HeaderContainer from "../components/HeaderContainer";
import { useVenueContext } from "../context/VenueContext";

function VenueCategoryScreen(props) {
  const { title, categoryId = null } = props.route.params;
  let { venues } = useVenueContext();

  if (categoryId !== null)
    venues = venues.filter((venue) => venue.category === categoryId);

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
                marginTop: 5,
              }}
            >
              {venues.length} matching venues
            </AppText>
          </View>
          <View style={styles.resultBox}>
            {venues.length > 0 ? (
              <FlatList
                data={venues}
                keyExtractor={(venue) =>
                  venue._id ? venue._id.toString() : null
                }
                renderItem={({ item }) => (
                  <VenueListItem venue={item} key={item._id} />
                )}
                ItemSeparatorComponent={() => <ListItemSeparator />}
              />
            ) : (
              <AppText style={{ padding: 10, alignSelf: "center" }}>
                No venues to display.
              </AppText>
            )}
          </View>
        </HeaderContainer>
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
    paddingBottom: 5,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    width: "100%",
  },
  symbolsGuideButton: {
    position: "absolute",
    bottom: 40,
  },
  resultBox: {
    backgroundColor: colors.white,
    overflow: "hidden",
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: colors.primary,
  },
});

export default VenueCategoryScreen;
