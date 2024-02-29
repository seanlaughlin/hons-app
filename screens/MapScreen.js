import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, AccessibilityInfo } from "react-native";
import MapViewDirections from "react-native-maps-directions";

import useLocation from "../hooks/useLocation";
import MapMarker from "../components/MapMarker";
import mapSettings from "../config/mapSettings";
import colors from "../config/colors";
import MapModal from "../components/MapModal";
import venues from "../mockdata/venues";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import { getBoundingRegion } from "../utility/mapUtils";
import { removeHtmlTags } from "../utility/removeHtmlTags";

function MapScreen(props) {
  const mapRef = useRef(null);
  const initLocation = useLocation();

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
    setStepInstructions(
      removeHtmlTags(directions[closestStepIndex].html_instructions)
    );
  };

  const onReady = (result) => {
    setCoordinates(result.coordinates);
    setOrigin({ latitude: location.latitude, longitude: location.longitude });
    const durationInMinutes = Math.ceil(result.legs[0].duration.value / 60);
    setDuration(durationInMinutes);
    setDistance(result.distance.toFixed(2));
    setDirections(result.legs[0].steps);
    setStepInstructions(
      removeHtmlTags(result.legs[0].steps[0].html_instructions)
    );
  };

  const handleMarkerPress = (venue) => {
    setModalVenue(venue);
    setIsModalVisible(true);
  };

  const handleCancelNavigation = () => {
    setDistance(null);
    setCoordinates([]);
    setIsNavigationMode(false);
  };

  const handleStartNavigation = () => {
    updateRegion();
    setIsModalVisible(false);
    setIsNavigationMode(true);
    AccessibilityInfo.announceForAccessibilityWithOptions(
      `Navigating to ${modalVenue.name}, ${distance} kilometers away.`,
      { options: { queue: true } }
    );
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
          >
            {isNavigationMode && modalVenue && origin && modalVenue.coords && (
              <MapViewDirections
                origin={origin}
                destination={modalVenue.coords}
                apikey={"AIzaSyDjqqVz1XAXLWjmilAFKiirz0mcgwxljxc"}
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
            {venues.map((venue) => (
              <MapMarker
                venueName={venue.name}
                coords={venue.coords}
                type={venue.type}
                onPress={
                  isNavigationMode ? null : () => handleMarkerPress(venue)
                }
                key={venue.id}
                accessibilityLabel={`${venue.type} Map Marker for ${venue.name}`}
                accessibilityHint="Press marker to open venue information modal."
                importantForAccessibility="yes"
              />
            ))}
          </MapView>
        )}
        {isNavigationMode && duration !== null && distance !== null && (
          <>
            <View style={[styles.durationBox, styles.opaqueBox]}>
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
                  ({distance} km)
                </AppText>
              </View>
              <AppText
                style={{ fontSize: 18 }}
                accessibilityLabel="Duration of travel"
              >
                Estimate: {duration} min 🚶‍♂️ (avg)
              </AppText>
            </View>
            <View style={[styles.directionsBox, styles.opaqueBox]}>
              <AppText
                style={{ fontSize: 15, fontWeight: 600 }}
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
                onPress={handleCancelNavigation}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  durationBox: {
    top: 60,
  },
  directionsBox: {
    bottom: 160,
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
