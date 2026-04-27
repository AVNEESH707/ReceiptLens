import axios from "axios";

const API = axios.create({
  baseURL: "https://receiptlens.onrender.com",
});

export const uploadFile = (formData) =>
  API.post("/upload", formData);
