import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Update to match your backend URL
});

export const login = (data) => API.post("/user/login", data);
export const signup = (data) => API.post("/user/signup", data);
export const fetchEmployees = () => API.get("/emp/employees");
export const createEmployee = (data) => API.post("/emp/employees", data);
export const updateEmployee = (id, data) => API.put(`/emp/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/emp/employees/${id}`);
export const getEmployeeById = (id) => API.get(`/emp/employees/${id}`);
export const searchEmployees = async (params) => {
  console.log("Sending search request with params:", params); // Debug log
  try {
    const response = await API.get(`/emp/employees/search`, { params });
    console.log("Search response:", response.data); // Debug log
    return response;
  } catch (error) {
    console.error("Error during API call:", error.response?.data || error.message);
    throw error;
  }
};