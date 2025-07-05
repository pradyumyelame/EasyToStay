// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://easytostay-backend.onrender.com", // Update to your backend
  withCredentials: true, // 👈 include cookies
});

export default instance;
