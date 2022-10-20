import axios from "axios";
import { SERVER_ROOTPAGE } from "./serverRoutes";

export const serverRequest = axios.create({
  baseURL: SERVER_ROOTPAGE,
  headers: {
    "Content-type": "application/json",
    "auth-token": "",
  },
});
