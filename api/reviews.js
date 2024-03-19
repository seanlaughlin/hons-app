import client from "./client";

const endpoint = "/reviews";

const getReviews = (venueId, accessId) =>
  client.post(endpoint, { venueId, accessId });

export default {
  getReviews,
};
