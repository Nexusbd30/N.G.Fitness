import http from "./http";

export async function getEvents() {
  const response = await http.get("/agenda");
  return response.data;
}

export async function createEvent(payload) {
  const response = await http.post("/agenda", payload);
  return response.data;
}

export async function rescheduleEvent(eventId, payload) {
  const response = await http.patch(`/agenda/${eventId}/reschedule`, payload);
  return response.data;
}

export async function updateEventStatus(eventId, payload) {
  const response = await http.patch(`/agenda/${eventId}/status`, payload);
  return response.data;
}
