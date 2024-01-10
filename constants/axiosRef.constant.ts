import axios from "axios";

const axiosRef = axios.create({
  baseURL: process.env.SERVER_DOMAIN,
});

export default axiosRef;
