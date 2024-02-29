import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
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
    <SafeAreaView>
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <AppText style={styles.title} accessibilityRole="header">
            {venue.name}
          </AppText>
          <AppText style={{ fontSize: 20 }}>
            {capitalise(venue.type)} in {venue.neighbourhood} ({distance} km
            away)
          </AppText>
          <ImageCarousel imageUris={venue.images} />
        </ScrollView>
        <AppText style={{ fontSize: 20 }}>{venue.address}</AppText>
        <View style={styles.venueInfo}>
          <View style={{ flex: 2 }}>
            <AppText style={styles.infoHeading}>Opening Hours</AppText>
            {venue.openingHours.map((item) => (
              <AppText style={{ marginBottom: 5 }}>
                {item.time}: {item.hours}
              </AppText>
            ))}
          </View>
          <View style={{ flex: 3 }}>
            <AppText style={styles.infoHeading}>Contact Details</AppText>
            {Object.entries(venue.contact).map(([key, value]) => (
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name={venueIconMapping[key]}
                  style={{ marginRight: 10 }}
                  accessibilityElementsHidden={true}
                />
                <AppText style={{ marginBottom: 5 }}>
                  {capitalise(key)} : {value}
                </AppText>
              </View>
            ))}
          </View>
        </View>
        <View
          style={styles.venueAccess}
          accessibilityLabel="Accessibility Information"
        >
          {venue.accessibility.map((item) => (
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
          ))}
        </View>
        <View style={styles.reviewBox}>
          <AppText
            style={{ color: colors.primary, fontSize: 20, marginBottom: 10 }}
          >
            Something Missing?
          </AppText>
          <AppText style={{ fontSize: 16 }}>
            As a community supported application, we rely on user submissions to
            provide venue accessibility information. If you'd like to report
            something about this venue, please click the button below to answer
            a few short questions on your experience at {venue.name}.
          </AppText>
          <AppButton title="📖 Submit a Review" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
  reviewBox: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 5,
    color: colors.primary,
  },
  venueAccess: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
  },
  venueInfo: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    width: "100%",
  },
});

export default VenueInfoScreen;
