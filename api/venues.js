import client from "./client";

const endpoint = "/venues";

const getVenues = () => client.get(endpoint);

const getFilteredVenues = (filters) =>
  client.post(endpoint + "/filter", filters);

// const getVenueById = (filters) => client.post(endpoint + '/filter', filters);

export default {
  getVenues,
  getFilteredVenues,
};
