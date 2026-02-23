import axios from "axios";

const API = axios.create({
   baseURL: "https://mydb-beige.vercel.app/api/items",
});

export default API;
