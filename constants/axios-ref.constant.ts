import axios from "axios";

const axiosRef = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
});

export default axiosRef;
