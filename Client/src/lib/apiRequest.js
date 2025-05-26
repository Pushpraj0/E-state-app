import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";
const apiRequest = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:8800/api"
    : "https://e-state-app-oqso.onrender.com",
  withCredentials: true,
});

export default apiRequest;
