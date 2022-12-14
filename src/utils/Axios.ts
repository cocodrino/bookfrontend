import axios, { AxiosInstance } from "axios";

//TODO fix vite error jest
//const apiUrl: string = import.meta.env.VITE_API;
const API_URL = "https://bookbackend.onrender.com";
//https://bookbackend.onrender.com/
if (!API_URL) {
  throw Error("please set VITE_API first");
}

const Axios: AxiosInstance = axios.create({
  baseURL: API_URL,
});

/*
Axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

Axios.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});
*/

export { API_URL, Axios };
