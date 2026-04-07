import http from "./http";

export async function getDashboard() {
  const response = await http.get("/trainer/dashboard");
  return response.data;
}

export async function getProfile() {
  const response = await http.get("/trainer/profile");
  return response.data;
}

export async function saveProfile(payload) {
  const response = await http.put("/trainer/profile", payload);
  return response.data;
}

export async function getGoals() {
  const response = await http.get("/trainer/goals");
  return response.data;
}

export async function createGoal(payload) {
  const response = await http.post("/trainer/goals", payload);
  return response.data;
}

export async function getRoutines() {
  const response = await http.get("/trainer/routines");
  return response.data;
}

export async function createRoutine(payload) {
  const response = await http.post("/trainer/routines", payload);
  return response.data;
}

export async function getSessions() {
  const response = await http.get("/trainer/sessions");
  return response.data;
}

export async function createSession(payload) {
  const response = await http.post("/trainer/sessions", payload);
  return response.data;
}
