import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = (data) => api.post("/sign-up", data);
export const signIn = (data) => api.post("/sign-in", data);
export const getTasks = () => api.get("/tasks");
export const addTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const completeTask = (id) => api.put(`/tasks/${id}/complete`);
