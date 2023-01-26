import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3003",
  timeout: 3000,
});

export default Api;
