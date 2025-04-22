
/**
 * Wrapper for backend API calls to Spring Boot server.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/** Utility: handle JSON requests + JWT token if present */
async function apiFetch<T = any>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("authToken");
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      credentials: 'include',
      headers,
      ...options,
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || res.statusText);
    }
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to the backend server. Please ensure it is running at ' + BASE_URL);
    }
    throw error;
  }
}

// ----------- AUTH -----------------
export async function apiLogin({ email, password }: { email: string; password: string }) {
  return apiFetch<{ token: string; userId: string; email: string; displayName: string; avatarUrl?: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
}

export async function apiRegister({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) {
  return apiFetch<{ token: string; userId: string; email: string; displayName: string; avatarUrl?: string }>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ email, password, displayName }),
    }
  );
}

// Room API (already ported)
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

// ---------------- DEVICES ------------------
export const getDevices = () => apiFetch("/devices");
export const addDevice = (device: any) =>
  apiFetch("/devices", {
    method: "POST",
    body: JSON.stringify(device),
  });
export const updateDeviceToggle = (id: string, is_on: boolean) =>
  apiFetch(`/devices/${id}/toggle`, {
    method: "PUT",
    body: JSON.stringify({ is_on }),
  });
export const updateDeviceStatus = (id: string, status: object) =>
  apiFetch(`/devices/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(status),
  });
