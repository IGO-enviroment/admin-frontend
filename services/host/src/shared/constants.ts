import axios from "axios";

export const baseURL = "https://e520-92-248-190-11.ngrok-free.app";

const ApiInstance = axios.create({
   baseURL,
});

const ApiAuthInstance = axios.create({
   baseURL,
});
