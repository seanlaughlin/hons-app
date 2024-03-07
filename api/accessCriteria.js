import client from "./client";

const endpoint = "/access";

const getAccessCriteria = () => client.get(endpoint);

export default {
  getAccessCriteria,
};
