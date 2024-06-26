import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  AccessibilityInfo,
} from "react-native";

import colors from "../config/colors";
import ContentContainer from "../components/ContentContainer";
import Search from "../components/Search";
import { useNavigation } from "@react-navigation/native";
import { useFilterContext } from "../context/FilterContext";
import { useVenueContext } from "../context/VenueContext";

function HomeScreen(props) {
  const navigation = useNavigation();
  const { filters } = useFilterContext();

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility("Welcome Access Local");
  }, []);

  const gotoSearchResults = () => {
    navigation.navigate("Find Venue", {
      screen: "VenueResultsScreen",
      params: {
        title: "Search Results",
        filters,
        returnTo: "FindVenueScreen",
      },
    });
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
        blurRadius={0.4}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.title}>AccessLocal 👨‍🦽</Text>
          <Text style={styles.tagline}>
            Find accessible local venues in your neighbourhood
          </Text>
        </View>
        <ContentContainer
          style={{
            marginHorizontal: 55,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            width: "auto",
            padding: 15,
          }}
        >
          <Text style={styles.welcome}>Welcome! 🙋‍♀️</Text>
          <Text>
            New here? Check out our 'Getting Started' guide to learn how to use
            the app.
          </Text>
          <Text style={styles.search}>Find a Venue</Text>
          <Search
            placeholder={"I'm looking for..."}
            onSubmit={gotoSearchResults}
            accessibilityLabel="Venue search field"
          />
        </ContentContainer>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
  },
  tagline: {
    fontSize: 15,
    fontWeight: "400",
    paddingVertical: 10,
    color: colors.dark,
  },
  search: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    paddingTop: 60,
    color: colors.dark,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
