import { getBounds } from "geolib";

const PADDING_FACTOR = 0.00003;

export function getBoundingRegion(location, venueCoords) {
  if (!location || !venueCoords) {
    return null;
  }

  const distance = getDistance(location, venueCoords);
  const paddedDistance = distance * PADDING_FACTOR;

  const bounds = getBounds([
    { latitude: location.latitude, longitude: location.longitude },
    { latitude: venueCoords.latitude, longitude: venueCoords.longitude },
  ]);

  const latitudeDelta = paddedDistance;
  const longitudeDelta = paddedDistance;

  return {
    latitude: (bounds.maxLat + bounds.minLat) / 2,
    longitude: (bounds.maxLng + bounds.minLng) / 2,
    latitudeDelta,
    longitudeDelta,
  };
}

export function getDistance(location, venueCoords) {
  // Calculate distance between two points using Haversine formula
  const R = 6371e3; // metres
  const φ1 = (location.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (venueCoords.latitude * Math.PI) / 180;
  const Δφ = ((venueCoords.latitude - location.latitude) * Math.PI) / 180;
  const Δλ = ((venueCoords.longitude - location.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
}

export function kmToMiles(km) {
  return (km * 0.621371).toFixed(2);
}
