export function generateRandomCoords(minLat, maxLat, minLng, maxLng) {
  const latitude = Math.random() * (maxLat - minLat) + minLat;
  const longitude = Math.random() * (maxLng - minLng) + minLng;
  return { latitude, longitude };
}
