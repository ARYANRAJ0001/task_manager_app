import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5235/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const signupUser = (userData) => API.post("/auth/signup", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// TASKS
export const getTasks = async () => {
  const res = await API.get("/task");
  return res.data; // IMPORTANT FIX
};
export const addTask = async (taskData) => {
  const res = await API.post("/task", taskData);
  return res.data;
};

export const deleteTask = async (taskId) => {
  const res = await API.delete(`/task/${taskId}`);
  return res.data;
};

export const updateTask = async (taskId, taskData) => {
  const res = await API.put(`/task/${taskId}`, taskData);
  return res.data;
};
