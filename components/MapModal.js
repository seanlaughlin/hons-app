import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppText from "./AppText";
import ModalAccessItem from "./ModalAccessItem";
import useLocation from "../hooks/useLocation";
import { getDistance } from "../utility/mapUtils";
import { kmToMiles } from "../utility/mapUtils";
import HeaderContainer from "./HeaderContainer";
import CloseButton from "./CloseButton";

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
        <HeaderContainer
          button={
            <CloseButton
              color={colors.white}
              action={handleCloseModal}
              size={30}
            />
          }
          title={venue.name}
          style={{
            paddingVertical: 15,
            borderColor: colors.medium,
            borderWidth: 1,
          }}
        >
          <AppText style={styles.subtitle}>
            {venue.type.title} in {venue.neighbourhood} ({kmToMiles(distance)}{" "}
            miles away)
          </AppText>
          <View style={styles.venueInfo}>
            <View
              style={{
                // flex: 3,
                rowGap: 2,
              }}
            >
              <Image
                style={styles.image}
                source={
                  venue.imageUris.length > 0
                    ? {
                        uri:
                          process.env.EXPO_PUBLIC_SERVER_URL +
                          "/" +
                          venue.imageUris[0].full,
                      }
                    : require("../assets/placeholder-square.jpg")
                }
              />
              <AppText
                style={{ fontWeight: 600 }}
                accessibilityLabel="Opening Hours"
              >
                Opening Hours
              </AppText>
              {venue.openingHours.length > 0 ? (
                venue.openingHours.map((item) => (
                  <AppText key={item._id} style={{ fontSize: 14 }}>
                    {item.days}: {item.hours}
                  </AppText>
                ))
              ) : (
                <AppText style={{ fontSize: 14 }}>None provided.</AppText>
              )}
              {venue.contact && venue.contact.phone && (
                <AppText style={{ fontSize: 14 }}>
                  Tel: {venue.contact.phone}
                </AppText>
              )}
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  ...styles.venueAccessInfo,
                  maxHeight: 220,
                }}
              >
                {venue.accessibility.filter(
                  (item) => item.reportedFor + item.reportedAgainst !== 0
                ).length === 0 && (
                  <AppText style={{ fontSize: 12 }}>
                    No access information to display.
                  </AppText>
                )}
                {venue.accessibility
                  .filter(
                    (item) => item.reportedFor > 0 && item.reportedAgainst === 0
                  )
                  .map((item) => (
                    <ModalAccessItem
                      key={item.criteria}
                      item={item}
                      accessibilityLabel={item.name}
                    />
                  ))}
                {venue.accessibility
                  .filter(
                    (item) => item.reportedFor > 0 && item.reportedAgainst > 0
                  )
                  .map((item) => (
                    <ModalAccessItem
                      key={item.criteria}
                      item={item}
                      accessibilityLabel={item.name}
                    />
                  ))}
              </ScrollView>
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
        </HeaderContainer>
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
    overflow: "visible",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },
  venueAccessInfo: {
    alignItems: "flex-start",
    marginLeft: 15,
    rowGap: 2,
  },
  venueInfo: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
  },
});

export default MapModal;
