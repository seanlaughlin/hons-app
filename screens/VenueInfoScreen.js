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
import ContentContainer from "../components/ContentContainer";
import HeaderContainer from "../components/HeaderContainer";
import { kmToMiles } from "../utility/mapUtils";
import SubmitReviewModal from "../components/SubmitReviewModal";

function VenueInfoScreen({ route }) {
  const [distance, setDistance] = useState(0);
  const { venue, fromSearch } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderContainer
          title={venue.name}
          button={<BackButton color={colors.white} size={40} />}
          style={styles.contentContainers}
        >
          <AppText style={{ fontSize: 18, marginTop: 5 }}>
            {capitalise(venue.type)} in {venue.neighbourhood} (
            {kmToMiles(distance)} miles away)
          </AppText>
          <ImageCarousel imageUris={venue.imageUris} />
          <AppText style={{ fontSize: 18 }}>{venue.address}</AppText>
          <View style={styles.buttonsContainer}>
            <AppButton
              title="🗺 Get Directions"
              onPress={() =>
                navigation.navigate("MapScreen", {
                  venue: venue,
                  fromSearch: fromSearch,
                })
              }
            />
            <AppButton title="⭐ Add to Favorites" />
          </View>
        </HeaderContainer>
        <ContentContainer style={[styles.venueInfo, styles.contentContainers]}>
          <View style={{ flex: 2 }}>
            <AppText style={styles.infoHeading}>Opening Hours</AppText>
            {venue.openingHours.map((item) => (
              <AppText
                style={{ marginBottom: 5, fontSize: 13 }}
                key={item.hours}
              >
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
        </ContentContainer>
        <ContentContainer
          style={styles.venueAccess}
          accessibilityLabel="Accessibility Information"
        >
          {/* show those with reportedFor and no mixed at top, then order by amount of reviews for */}
          <FlatList
            data={venue.accessibility.sort((a, b) => {
              if (a.reportedFor !== 0 && b.reportedFor === 0) return -1;
              if (a.reportedAgainst > 0 && b.reportedAgainst === 0) return 1;
              if (a.reportedAgainst === 0 && b.reportedAgainst === 0) {
                return b.reportedFor - a.reportedFor;
              }
              return a.reportedAgainst - b.reportedAgainst;
            })}
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
        </ContentContainer>
        <ContentContainer style={{ paddingBottom: 15 }}>
          <AppText
            style={{ color: colors.primary, fontSize: 20, marginBottom: 5 }}
          >
            Something Missing?
          </AppText>
          <AppText style={{ fontSize: 15 }}>
            As a community supported application, we rely on user submissions to
            provide venue accessibility information. If you'd like to report
            something about this venue, please tap the button below to answer a
            few short questions on your experience at {venue.name}.
          </AppText>
          <AppButton
            title="📖 Leave a Review"
            style={{ marginTop: 10 }}
            onPress={() => setIsModalVisible(true)}
          />
        </ContentContainer>
      </ScrollView>
      <SubmitReviewModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        venue={venue}
      />
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
  contentContainers: {
    paddingBottom: 15,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
    alignSelf: "center",
    overflow: "hidden",
  },
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 40,
  },
  title: {
    fontSize: 30,
    color: colors.white,
  },
  venueAccess: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  venueInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default VenueInfoScreen;
