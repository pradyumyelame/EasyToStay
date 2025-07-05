// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://easytostay-backend.onrender.com",
  withCredentials: true, // ✅ crucial for sending cookies
});

export default instance;
