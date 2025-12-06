import axios from "axios";

const API = axios.create({
  baseURL: "https://gvcc-project-backend.onrender.com/api" || "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers["x-admin-token"] = token;
  return config;
});

export default API;
