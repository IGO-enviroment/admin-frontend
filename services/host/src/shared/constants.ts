import axios from "axios";
import { getCookie } from "@/shared/cookies/get";

export const baseURL = "https://98c1-178-46-71-134.ngrok-free.app/";

const ApiInstance = axios.create({
   baseURL,
});

export const ApiAuthInstance = axios.create({
   baseURL,
});

ApiAuthInstance.interceptors.request.use((config) => {
   config.headers.Authorization = getCookie("museum_client_auth");

   return config;
});
