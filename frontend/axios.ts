import axios from "axios";


export const API = axios.create({
    baseURL: "http://192.168.31.193:3000/api"
})
