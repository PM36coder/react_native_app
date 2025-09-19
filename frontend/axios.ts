import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.31.254:3000/api"
})
