import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, FlatList, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppText from "./AppText";
import ModalAccessItem from "./ModalAccessItem";
import capitalise from "../utility/capitalise";
import useLocation from "../hooks/useLocation";
import { getDistance } from "../utility/mapUtils";

function MapModal({
  venue,
  isModalVisible,
  setIsModalVisible,
  handleStartNavigation,
  ...others
}) {
  const [distance, setDistance] = useState(0);

  const navigation = useNavigation();
  const location = useLocation();

  useEffect(() => {
    if (location)
      setDistance((getDistance(location, venue.coords) / 1000).toFixed(2));
  }, [location]);

  const handleFullInfoPress = () => {
    setIsModalVisible(false);
    navigation.navigate("VenueInfoScreen", { venue: venue });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}
      {...others}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <MaterialCommunityIcons
            name="close"
            style={styles.closeIcon}
            size={25}
            color={colors.medium}
            onPress={handleCloseModal}
            accessibilityLabel="Close Button"
            accessibilityHint="Press here to close venue information modal."
            accessibilityRole="button"
          />
          <AppText
            style={{ fontSize: 22, fontWeight: 600 }}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {venue.name}
          </AppText>
          <AppText style={styles.subtitle}>
            {capitalise(venue.type)} in {venue.neighbourhood} ({distance} km
            away)
          </AppText>
          <View style={styles.venueInfo}>
            <View
              style={{
                flex: 3,
                alignItems: "flex-start",
                rowGap: 2,
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: venue.imageUris[0] }}
              />
              <AppText
                style={{ fontWeight: 600 }}
                accessibilityLabel="Opening Hours"
              >
                Opening Hours
              </AppText>
              {venue.openingHours.map((item) => (
                <AppText key={item.id} style={{ fontSize: 15 }}>
                  {item.time}: {item.hours}
                </AppText>
              ))}
              <AppText style={{ fontSize: 15 }}>
                Tel: {venue.contact.phone}
              </AppText>
            </View>
            <View>
              <FlatList
                data={venue.accessibility.filter(
                  (item) => item.reportedFor > 0 && item.reportedAgainst === 0
                )}
                renderItem={({ item }) => (
                  <ModalAccessItem item={item} accessibilityLabel={item.name} />
                )}
                keyExtractor={(item) => item.criteria.toString()}
                contentContainerStyle={styles.venueAccessInfo}
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: 220 }}
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton
              title="📖 Full Info"
              onPress={handleFullInfoPress}
              accessibilityLabel="Full Venue Information"
              accessibilityHint="Press to read full venue information."
            />
            <AppButton
              title="🗺 Directions"
              onPress={handleStartNavigation}
              accessibilityLabel="Directions to Venue"
              accessibilityHint="Press to get directions to the venue."
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
  },
  closeIcon: {
    alignSelf: "flex-start",
  },
  image: {
    width: "60%",
    height: 140,
    width: 140,
    borderRadius: 8,
    borderColor: colors.medium,
    borderWidth: 1,
    marginBottom: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  modalContent: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: "100%",
    maxHeight: 500,
  },
  subtitle: {
    fontSize: 15,
  },
  venueAccessInfo: {
    alignItems: "flex-start",
    rowGap: 2,
  },
  venueInfo: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapModal;
