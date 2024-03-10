import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import ImageCarousel from "../components/ImageCarousel";
import venueIconMapping from "../config/venueIconMapping";
import VenueInfoAccessItem from "../components/VenueInfoAccessItem";
import AppButton from "../components/AppButton";
import BackButton from "../components/BackButton";
import useLocation from "../hooks/useLocation";
import { getDistance } from "../utility/mapUtils";
import ListItemSeparator from "../components/ListItemSeparator";

function VenueInfoScreen({ route }) {
  const [distance, setDistance] = useState(0);
  const { venue } = route.params;

  const location = useLocation();

  const navigation = useNavigation();

  useEffect(() => {
    if (location)
      setDistance((getDistance(location, venue.coords) / 1000).toFixed(2));
  }, [location]);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.light, paddingHorizontal: 15 }}
    >
      {/* <BackButton /> */}
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: colors.white,
            width: "100%",
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 15,
          }}
        >
          <AppText style={styles.title} accessibilityRole="header">
            {venue.name}
          </AppText>
          <AppText style={{ fontSize: 18 }}>
            {capitalise(venue.type)} in {venue.neighbourhood} ({distance} km
            away)
          </AppText>
          <ImageCarousel imageUris={venue.imageUris} />
          <AppText style={{ fontSize: 18 }}>{venue.address}</AppText>
          <View style={styles.buttonsContainer}>
            <AppButton title="🗺 View on Map" />
            <AppButton title="⭐ Add to Favorites" />
          </View>
        </View>
        <View style={styles.venueInfo}>
          <View style={{ flex: 2 }}>
            <AppText style={styles.infoHeading}>Opening Hours</AppText>
            {venue.openingHours.map((item) => (
              <AppText style={{ marginBottom: 5, fontSize: 13 }}>
                {item.time}: {item.hours}
              </AppText>
            ))}
          </View>
          <View style={{ flex: 3 }}>
            <AppText style={styles.infoHeading}>Contact Details</AppText>
            {Object.entries(venue.contact).map(
              ([key, value]) =>
                key !== "_id" && (
                  <View style={{ flexDirection: "row" }} key={key}>
                    <MaterialCommunityIcons
                      name={venueIconMapping[key]}
                      style={{ marginRight: 10 }}
                      accessibilityElementsHidden={true}
                    />
                    <AppText style={{ marginBottom: 5, fontSize: 13 }}>
                      {capitalise(key)} : {value}
                    </AppText>
                  </View>
                )
            )}
          </View>
        </View>
        <View
          style={styles.venueAccess}
          accessibilityLabel="Accessibility Information"
        >
          <FlatList
            data={venue.accessibility}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <VenueInfoAccessItem
                item={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate("AccessibilityReviewsScreen", {
                    venue: venue,
                    accessibilityItem: item,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.criteria.toString()}
          />
        </View>
        <View style={styles.reviewBox}>
          <AppText
            style={{ color: colors.primary, fontSize: 20, marginBottom: 5 }}
          >
            Something Missing?
          </AppText>
          <AppText style={{ fontSize: 15 }}>
            As a community supported application, we rely on user submissions to
            provide venue accessibility information. If you'd like to report
            something about this venue, please click the button below to answer
            a few short questions on your experience at {venue.name}.
          </AppText>
          <AppButton title="📖 Submit a Review" style={{ marginTop: 10 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  container: {
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    overflow: "hidden",
    rowGap: 8,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
    alignSelf: "center",
    overflow: "hidden",
  },
  reviewBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 35,
    color: colors.primary,
    marginTop: 5,
  },
  venueAccess: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  venueInfo: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});

export default VenueInfoScreen;
