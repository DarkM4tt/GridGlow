import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchStudents = () => API.get("/users");

export default API;
