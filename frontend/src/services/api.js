import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const getCrowd = () => API.get("/crowd");
export const getAlerts = () => API.get("/alerts");
export const getPrediction = (location) =>
  API.get(`/predict/${location}`);

export const getRoute = (source, destination) =>
  API.get(`/route?source=${source}&destination=${destination}`);