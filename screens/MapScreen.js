import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Circle,
  Marker,
} from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, AccessibilityInfo } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";

import useLocation from "../hooks/useLocation";
import MapMarker from "../components/MapMarker";
import mapSettings from "../config/mapSettings";
import colors from "../config/colors";
import MapModal from "../components/MapModal";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { getBoundingRegion } from "../utility/mapUtils";
import { removeHtmlTags } from "../utility/removeHtmlTags";
import { useFilterContext } from "../context/FilterContext";
import FiltersButton from "../components/FiltersButton";
import { kmToMiles } from "../utility/mapUtils";
import { useVenueContext } from "../context/VenueContext";
import { reverseGeocodeAddress } from "../utility/googleMaps";
import AddVenueModal from "../components/AddVenueModal";

function MapScreen({ route }) {
  const mapRef = useRef(null);
  const initLocation = useLocation();
  const navigator = useNavigation();

  const [location, setLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNavigationMode, setIsNavigationMode] = useState(false);
  const [modalVenue, setModalVenue] = useState({});
  const [duration, setDuration] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState(null);
  const [origin, setOrigin] = useState({});
  const [region, setRegion] = useState(null);

  const [directions, setDirections] = useState([]);
  const [stepInstructions, setStepInstructions] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [isMarkerPlaceMode, setIsMarkerPlaceMode] = useState(false);
  const [newVenueCoords, setNewVenueCoords] = useState(null);
  const [newVenueAddress, setNewVenueAddress] = useState(null);
  const [isNewVenueModalVisible, setIsNewVenueModalVisible] = useState(false);

  // need to find a way to stop search term filtering map venues
  const { mapVenues } = useVenueContext();
  const { filters } = useFilterContext();

  useEffect(() => {
    if (initLocation) {
      setLocation(initLocation);
    }
  }, [initLocation]);

  useEffect(() => {
    if (location) {
      setOrigin({ latitude: location.latitude, longitude: location.longitude });
    }
  }, [location]);

  useEffect(() => {
    updateRegion();
  }, [modalVenue]);

  useEffect(() => {
    if (route.params && route.params.venue) {
      updateRegion();
      setOrigin(route.params.venue.coords);
      setModalVenue(route.params.venue);
      setIsNavigationMode(true);
    }
  }, [route.params]);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibilityWithOptions(stepInstructions, {
      options: { queue: true },
    });
  }, [stepInstructions]);

  useEffect(() => {
    if (newVenueCoords) {
      reverseGeocodeAddress(newVenueCoords)
        .then((result) => setNewVenueAddress(result))
        .catch((error) => setNewVenueAddress("Error fetching address"));
    }
  }, [newVenueCoords]);

  const updateRegion = () => {
    const newRegion = getBoundingRegion(location, modalVenue.coords);
    if (newRegion) {
      setRegion(newRegion);
      mapRef.current && mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const updateUserLocation = (userLocation) => {
    setLocation(userLocation);
    if (isNavigationMode) updateCurrentStepIndex(userLocation);
  };

  const updateCurrentStepIndex = (userLocation) => {
    let closestStepIndex = 0;
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < directions.length; i++) {
      const step = directions[i];
      if (distance < minDistance) {
        minDistance = distance;
        closestStepIndex = i;
      }
    }
    setCurrentStepIndex(closestStepIndex);
    if (directions[closestStepIndex]) {
      setStepInstructions(
        removeHtmlTags(directions[closestStepIndex].html_instructions)
      );
    }
  };

  const onReady = (result) => {
    setCoordinates(result.coordinates);
    setOrigin({ latitude: location.latitude, longitude: location.longitude });
    const durationInMinutes = Math.ceil(result.legs[0].duration.value / 60);
    setDuration(durationInMinutes);
    setDistance(result.distance.toFixed(2));
    setDirections(result.legs[0].steps);
    if (result) {
      setStepInstructions(
        removeHtmlTags(result.legs[0].steps[0].html_instructions)
      );
    }
  };

  const handleMarkerPress = (venue) => {
    setModalVenue(venue);
    setIsModalVisible(true);
  };

  const handleCancelNavigation = () => {
    setDistance(null);
    setCoordinates([]);
    setIsNavigationMode(false);
    if (route.params && route.params.fromSearch) {
      navigator.goBack();
    } else {
      setIsNavigationMode(false);
    }
  };

  const handleStartNavigation = () => {
    updateRegion();
    setIsModalVisible(false);
    setIsNavigationMode(true);
    AccessibilityInfo.announceForAccessibilityWithOptions(
      `Navigating to ${modalVenue.name}, ${distance} kilometers away.`
    );
  };

  const handleMapPress = (event) => {
    if (isMarkerPlaceMode) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setNewVenueCoords({ latitude, longitude });
    } else {
      return;
    }
  };

  const handleMarkerPlaceModeCancel = () => {
    setNewVenueCoords(null);
    setNewVenueAddress(null);
    setIsMarkerPlaceMode(false);
  };

  const handleNewVenueModalClose = () => {
    setIsNewVenueModalVisible(false);
    setNewVenueAddress(null);
    setNewVenueCoords(null);
    setIsMarkerPlaceMode(false);
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <MapModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          venue={modalVenue}
          handleStartNavigation={handleStartNavigation}
          accessibilityLabel="Overview of venue information"
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
            ref={mapRef}
            onUserLocationChange={(event) =>
              updateUserLocation(event.nativeEvent.coordinate)
            }
            accessibilityLabel="Map of the local area"
            onPress={handleMapPress}
          >
            <Circle
              center={location}
              radius={filters.selectedDistance * 1000}
              strokeWidth={3}
              strokeColor={colors.primary}
            />
            {isNavigationMode && modalVenue && origin && modalVenue.coords && (
              <MapViewDirections
                origin={origin}
                destination={modalVenue.coords}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                mode={"WALKING"}
                onReady={onReady}
                strokeWidth={0}
              />
            )}
            {coordinates.length > 0 && isNavigationMode && (
              <Polyline
                coordinates={coordinates}
                strokeWidth={10}
                strokeColor={colors.primary}
                lineCap="round"
              />
            )}
            {mapVenues &&
              mapVenues.length > 0 &&
              mapVenues.map((venue) => (
                <MapMarker
                  venueName={venue.name}
                  coords={venue.coords}
                  type={venue.type}
                  onPress={
                    isNavigationMode || isMarkerPlaceMode
                      ? null
                      : () => handleMarkerPress(venue)
                  }
                  key={venue._id}
                  accessibilityLabel={`${venue.type} Map Marker for ${venue.name}`}
                  accessibilityHint="Press marker to open venue information modal."
                  importantForAccessibility="yes"
                />
              ))}
            {newVenueCoords && <Marker coordinate={newVenueCoords} />}
          </MapView>
        )}
        {isNavigationMode && duration !== null && distance !== null && (
          <>
            <View style={[styles.topMessageBox, styles.opaqueBox]}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <AppText style={{ fontSize: 20 }}>Travelling to </AppText>
                <AppText style={{ fontSize: 20, fontWeight: 600 }}>
                  {modalVenue.name}
                </AppText>
                <AppText
                  style={{ fontSize: 18 }}
                  accessibilityLabel="Distance to venue"
                >
                  {" "}
                  ({kmToMiles(distance)} miles)
                </AppText>
              </View>
              <AppText
                style={{ fontSize: 18 }}
                accessibilityLabel="Duration of travel"
              >
                Estimate: {duration} min 🚶‍♂️ /{"  "}
                {Math.round(duration * 1.114)} min ♿
              </AppText>
            </View>
            <View style={[styles.bottomMessageBox, styles.opaqueBox]}>
              <AppText
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                }}
                accessibilityLabel="Directions"
              >
                {stepInstructions}
              </AppText>
            </View>
            <View style={styles.navigationButtons}>
              <AppButton
                title="👋 I've arrived"
                color="green"
                borderColor={colors.greendark}
                onPress={() => setIsNavigationMode(false)}
                accessibilityLabel="Confirm arrival at the venue"
              />
              <AppButton
                title="❌ Cancel Journey"
                color="danger"
                borderColor={colors.dangerdark}
                onPress={handleCancelNavigation}
                accessibilityLabel="Cancel navigation to the venue"
              />
            </View>
          </>
        )}
      </View>
      {!isNavigationMode && !isMarkerPlaceMode && !isModalVisible && (
        <View style={styles.filterButton}>
          <FiltersButton />
          <AppButton
            title="➕ Add Venue"
            onPress={() => setIsMarkerPlaceMode(true)}
          />
        </View>
      )}
      {isMarkerPlaceMode && (
        <>
          <View style={styles.filterButton}>
            {newVenueCoords && (
              <AppButton
                title="✅ Confirm"
                onPress={() => setIsNewVenueModalVisible(true)}
              />
            )}

            <AppButton
              title="❌ Cancel"
              onPress={handleMarkerPlaceModeCancel}
            />
          </View>
          {isMarkerPlaceMode && (
            <View style={[styles.topMessageBox, styles.opaqueBox]}>
              <AppText accessibilityLabel="Tap the location of the venue on the map">
                💡 Tap the location of the venue on the map
              </AppText>
            </View>
          )}
          {newVenueAddress && newVenueAddress.address && isMarkerPlaceMode && (
            <View style={[styles.opaqueBox, { bottom: 100 }]}>
              <AppText accessibilityLabel={newVenueAddress}>
                {newVenueAddress.address.split(",")[0]}
              </AppText>
              <AppText style={{ fontSize: 15 }}>
                Is this the venue address?
              </AppText>
            </View>
          )}
          <AddVenueModal
            isVisible={isNewVenueModalVisible}
            onClose={handleNewVenueModalClose}
            coords={newVenueCoords}
            address={newVenueAddress}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
  },
  topMessageBox: {
    top: 60,
  },
  bottomMessageBox: {
    bottom: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
  },
  navigationButtons: {
    position: "absolute",
    bottom: 60,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 20,
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
  opaqueBox: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 5,
    shadowColor: colors.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
