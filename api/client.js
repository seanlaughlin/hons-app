import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://hons-backend.onrender.com/api",
});

export default apiClient;
