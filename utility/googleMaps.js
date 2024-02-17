import { directions } from "@googlemaps/google-maps-services-js";

// No need to create a client, use the directions function directly

export async function getDirections(origin, destination) {
  try {
    const response = await directions({
      params: {
        origin: `${origin.latitude},${origin.longitude}`,
        destination: `${destination.latitude},${destination.longitude}`,
        mode: "walking",
        key: "AIzaSyDjqqVz1XAXLWjmilAFKiirz0mcgwxljxc",
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
      key: "AIzaSyDjqqVz1XAXLWjmilAFKiirz0mcgwxljxc",
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
