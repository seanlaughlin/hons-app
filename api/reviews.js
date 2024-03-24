import client from "./client";

const endpoint = "/reviews";

const getReviews = (venueId, accessCriteria) =>
  client.post(endpoint, { venueId, accessCriteria });

const saveReview = (review) => {
  const data = new FormData();
  data.append("user", review.user ? review.user : "Anonymous");
  data.append("accessCriteria", review.accessCriteria);
  data.append("venueId", review.venueId);
  data.append("date", review.date.toISOString());
  data.append("for", review.for);
  data.append("comment", review.comment);
  data.append("image", {
    name: "image",
    type: "image/jpeg",
    uri: review.image,
  });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return client.post(endpoint + "/save", data, config);
};

export default {
  getReviews,
  saveReview,
};
