import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { View, StyleSheet } from "react-native";
import useLocation from "../hooks/useLocation";
import MapMarker from "../components/MapMarker";
import mapSettings from "../config/mapSettings";
import colors from "../config/colors";
import { useState } from "react";
import MapModal from "../components/MapModal";

const venues = [
  {
    name: "The Gaelic School",
    address: "123 The mad Street Glasgow G3 8LS",
    opening: [
      { time: "Mon - Fri", hours: "9am - 7pm" },
      { time: "Sat", hours: "9am - 10pm" },
      { name: "Sun", hours: "Closed" },
    ],
    coords: { latitude: 55.86506, longitude: -4.27778 },
  },
  {
    name: "Lloyds Pharmacy",
    address: "124 The mad Street Glasgow G3 8LS",
    opening: [
      { time: "Mon - Fri", hours: "9am - 7pm" },
      { time: "Sat", hours: "9am - 10pm" },
      { name: "Sun", hours: "Closed" },
    ],
    coords: { latitude: 55.8632, longitude: -4.2757 },
  },
];

function MapScreen(props) {
  const location = useLocation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVenue, setModalVenue] = useState("");

  const handleMarkerPress = (venue) => {
    console.log(venue);
    setModalVenue(venue);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        venue={modalVenue}
      />
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            customMapStyle={mapSettings}
            provider={PROVIDER_GOOGLE}
            nearbyPlacesAPI={"none"}
            tintColor={colors.primary}
          >
            <MapMarker
              venueName="The Gaelic School"
              coords={{ latitude: 55.86506, longitude: -4.27778 }}
              icon="school"
              onPress={() => handleMarkerPress("The Gaelic School")}
            />
            <MapMarker
              venueName="Lloyds Pharmacy"
              coords={{ latitude: 55.8632, longitude: -4.2757 }}
              icon="hospital-box"
              onPress={handleMarkerPress}
            />
          </MapView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
