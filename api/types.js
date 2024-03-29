import client from "./client";

const endpoint = "/types";

const getTypes = () => client.get(endpoint);

const getTypesByCategory = (categoryId) => {
  return client.get(endpoint + `/category/${categoryId}`);
};

const getTypesByCategories = (categoryIds) => {
  return client.post(endpoint + "/categories", { categoryIds });
};

export default {
  getTypes,
  getTypesByCategory,
  getTypesByCategories,
};
