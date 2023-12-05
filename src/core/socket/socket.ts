import { API_BASE_URL } from "@/core/constants";
import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = API_BASE_URL;

export const socket = io(URL);
