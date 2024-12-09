import axios from "axios";
import { baseUrl } from "./Constants/Constants";
// import { baseUrl } from "./Constants/Urls";
const instance = axios.create({
  baseURL: baseUrl,
});

export default instance