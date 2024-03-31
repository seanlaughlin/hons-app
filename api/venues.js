import client from "./client";

const endpoint = "/venues";

const getVenues = () => client.get(endpoint);

const getFilteredVenues = (filters) =>
  client.post(endpoint + "/filter", filters);

const saveVenue = (venue) => {
  const data = new FormData();
  console.log("contact", venue.contactInfo);
  data.append("address", venue.address);
  data.append("category", venue.category);
  data.append("name", venue.name);
  data.append("contact", JSON.stringify(venue.contactInfo) || {});
  data.append("openingHours", JSON.stringify(venue.openingHours) || []);
  data.append("coords", JSON.stringify(venue.coords));
  data.append("neighbourhood", venue.neighbourhood);
  data.append("type", venue.type);
  if (venue.imageUris) {
    venue.imageUris.forEach((image, index) => {
      data.append("images", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image,
      });
    });
  }
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return client.post(endpoint + "/save", data, config);
};

export default {
  getVenues,
  getFilteredVenues,
  saveVenue,
};
