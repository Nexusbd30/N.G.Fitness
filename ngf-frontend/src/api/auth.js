import http from "./http";

export async function login(payload) {
  const response = await http.post("/auth/login", payload);
  return response.data;
}

export async function register(payload) {
  const response = await http.post("/auth/register", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await http.get("/auth/me");
  return response.data;
}

export async function logout() {
  const response = await http.post("/auth/logout");
  return response.data;
}

export async function getSettings() {
  const response = await http.get("/auth/settings");
  return response.data;
}

export async function updateSettings(payload) {
  const response = await http.patch("/auth/settings", payload);
  return response.data;
}

export async function changePassword(payload) {
  const response = await http.post("/auth/change-password", payload);
  return response.data;
}
