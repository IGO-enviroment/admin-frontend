import axios from "axios";
import { getCookie } from "@/shared/cookies/get";

// export const baseURL = "https://a845-94-50-125-232.ngrok-free.app";
export const baseURL = "https://api.museum-ekb.ru/";

const ApiInstance = axios.create({
   baseURL,
});

export const ApiAuthInstance = axios.create({
   baseURL,
});

ApiAuthInstance.interceptors.request.use((config) => {
   config.headers.Authorization = getCookie("museum_client_auth");
   config.headers["ngrok-skip-browser-warning"] = "true";
   return config;
});
