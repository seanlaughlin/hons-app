import { create } from "apisauce";
const apiClient = create({
  baseURL: `${process.env.EXPO_PUBLIC_SERVER_URL}/api`,
});

export default apiClient;
