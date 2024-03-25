import { directions } from "@googlemaps/google-maps-services-js";
import axios from "axios";

export async function getDirections(origin, destination) {
  try {
    const response = await directions({
      params: {
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        mode: "walking",
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw error;
  }
}

export function decodePolyline(polyline) {
  return directions({
    params: {
      polyline: polyline,
      key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
    },
  })
    .then((response) => {
      return response.data.routes[0].overview_polyline.points;
    })
    .catch((error) => {
      console.error("Error decoding polyline:", error);
      throw error;
    });
}

export async function reverseGeocodeAddress(coords) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
    );

    if (response.data.status === "OK" && response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
}
