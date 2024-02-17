import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import useLocation from "../hooks/useLocation";
import MapMarker from "../components/MapMarker";
import mapSettings from "../config/mapSettings";
import colors from "../config/colors";
import MapModal from "../components/MapModal";
import venues from "../mockdata/venues";

function MapScreen(props) {
  const location = useLocation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNavigationMode, setIsNavigationMode] = useState(false);
  const [modalVenue, setModalVenue] = useState({});

  const handleMarkerPress = (venue) => {
    setModalVenue(venue);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <MapModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          venue={modalVenue}
        />
      )}
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
            {venues.map((venue) => (
              <MapMarker
                venueName={venue.name}
                coords={venue.coords}
                type={venue.type}
                onPress={
                  isNavigationMode ? null : () => handleMarkerPress(venue)
                }
                key={venue.id}
              />
            ))}
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
