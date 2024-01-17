import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.0.10:8080/",
});

export default http;
