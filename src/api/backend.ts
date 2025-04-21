
/**
 * Wrapper for backend API calls to Spring Boot server.
 * Adjust BASE_URL to your backend's URL as needed (localhost for dev, etc).
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Helper to handle JSON requests
async function apiFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }
  return res.json();
}

// Room API
export const getRooms = () => apiFetch("/rooms");
export const addRoom = (room: { name: string }) =>
  apiFetch("/rooms", {
    method: "POST",
    body: JSON.stringify(room),
  });
export const updateRoom = (id: string, updates: { name: string }) =>
  apiFetch(`/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
export const deleteRoom = (id: string) =>
  apiFetch(`/rooms/${id}`, { method: "DELETE" });

