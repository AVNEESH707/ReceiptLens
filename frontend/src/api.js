import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ocr",
});

export const uploadFile = (formData) =>
  API.post("/upload", formData);
