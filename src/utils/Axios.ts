import axios, { AxiosInstance } from "axios";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const apiUrl: string = import.meta.env.VITE_POKEMON_API;

if (!apiUrl) {
  throw Error("please set VITE_POKEMON_API first");
}

const Axios: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

export { apiUrl, Axios };
