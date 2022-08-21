import axios from "axios";
import { getItem } from "../util/storage";
const SERVICE_BASE_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

const anonymousInstance = axios.create({
  baseURL: SERVICE_BASE_URL,
});
const authorizedInstance = axios.create({
  baseURL: SERVICE_BASE_URL,
});

authorizedInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = getItem("access_token", null);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } else {
        throw new axios.Cancel("로그인이 필요합니다.");
      }
      return config;
    } catch (error) {
      window.history.pushState(null, null, `/`);
      alert(error.message);
      return Promise.reject({ response: { data: { error } } });
    }
  },
  (error) => {
    return Promise.reject({ response: { data: { error } } });
  }
);

export { anonymousInstance, authorizedInstance };
