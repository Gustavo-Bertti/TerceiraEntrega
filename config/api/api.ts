import axios from "axios";

const api = axios.create({
        baseURL: 'https://segunda-entrega-latest.onrender.com',
    });
export default api;