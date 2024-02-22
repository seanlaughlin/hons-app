import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import capitalise from "../utility/capitalise";
import ImageCarousel from "../components/ImageCarousel";
import venueIconMapping from "../config/venueIconMapping";
import VenueInfoAccessItem from "../components/VenueInfoAccessItem";
import AppButton from "../components/AppButton";
import BackButton from "../components/BackButton";

function VenueInfoScreen({ route }) {
  const { venue } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView
        contentContainerStyle={{ height: "100%", alignItems: "center" }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText style={styles.title}>{venue.name}</AppText>
          <AppText style={{ fontSize: 22 }}>
            {capitalise(venue.type)} in Royston
          </AppText>
          <ImageCarousel imageUris={venue.images} />
        </ScrollView>
        <AppText style={{ fontSize: 20 }}>{venue.address}</AppText>
        <View style={styles.venueInfo}>
          <View style={{ flex: 2 }}>
            <AppText style={styles.infoHeading}>Opening Hours</AppText>
            {venue.openingHours.map((item) => (
              <AppText>
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
                />
                <AppText>
                  {capitalise(key)} : {value}
                </AppText>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.venueAccess}>
          {venue.accessibility.map((item) => (
            <VenueInfoAccessItem item={item} key={item.id} />
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
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
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
