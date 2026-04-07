import http from "./http";

export async function getCoachDashboard() {
  const response = await http.get("/coach/dashboard");
  return response.data;
}

export async function getCoachAthletes() {
  const response = await http.get("/coach/athletes");
  return response.data;
}
