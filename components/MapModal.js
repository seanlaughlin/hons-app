import React from "react";
import { View, StyleSheet, Image, FlatList, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppText from "./AppText";
import ModalAccessItem from "./ModalAccessItem";
import capitalise from "../utility/capitalise";

function MapModal({ venue, isModalVisible, setIsModalVisible }) {
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal} // For Android back button support
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <MaterialCommunityIcons
            name="close"
            style={styles.closeIcon}
            size={25}
            color={colors.medium}
            onPress={handleCloseModal}
          />
          <AppText style={{ fontSize: 22, fontWeight: 600 }} numberOfLines={1}>
            {venue.name}
          </AppText>
          <AppText style={styles.subtitle}>
            {capitalise(venue.type)} in Royston (0.5 miles away)
          </AppText>
          <View style={styles.venueInfo}>
            <View
              style={{
                flex: 4,
                alignItems: "flex-start",
                rowGap: 5,
              }}
            >
              <Image style={styles.image} source={venue.images[0]} />
              <AppText style={{ fontWeight: 600 }}>Opening Hours</AppText>
              {venue.openingHours.map((item) => (
                <AppText key={item.id}>
                  {item.time}: {item.hours}
                </AppText>
              ))}
              <AppText>Tel: {venue.contact.phone}</AppText>
            </View>
            <View>
              <FlatList
                data={venue.accessibility.filter(
                  (item) => item.reportedFor > 0 && item.reportedAgainst === 0
                )}
                renderItem={({ item }) => (
                  <ModalAccessItem item={item} key={item.id} />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.venueAccessInfo}
                showsVerticalScrollIndicator={true}
              />
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton title="📖 Full Info" />
            <AppButton title="🗺 Directions" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    columnGap: 25,
  },
  closeIcon: {
    alignSelf: "flex-start",
  },
  image: {
    width: "60%",
    height: 130,
    width: 130,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    alignSelf: "center",
    padding: 15,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    width: "100%",
  },
  subtitle: {
    fontSize: 15,
  },
  venueAccessInfo: { alignItems: "flex-start", rowGap: 5 },
  venueInfo: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapModal;
