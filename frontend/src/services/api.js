import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export default backendApi;