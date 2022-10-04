import axios from "axios";

// Config
import { backendURL } from "@/config/backend";
import store from "@/store";
const instance = axios.create({
  baseURL: backendURL,
});

instance.interceptors.request.use(
  (config) => {
    const token =  store.getters["token/getLocalAccessToken"];
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err?.config;

    if (
      originalConfig?.url &&
      originalConfig.url !== "login/" &&
      originalConfig.url !== "token/refresh/"
    ) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
           store.commit("token/updateLocalAccessToken",null);
          const rs = await instance.post("token/refresh/", {
          });

          const { access } = rs.data;
           store.commit("token/updateLocalAccessToken",access);
          if (originalConfig.url === "token/verify/") {
            originalConfig.data = JSON.stringify({ token: access });
          }

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
