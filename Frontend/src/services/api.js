// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // 1. Get the accessToken from localStorage if it exists
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // 2. Automatically attach Bearer token to all requests
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    headers,
    ...options,
  };

  try {
const response = await fetch(url, config);
    // 1. If 401 on protected routes (expired token), auto-logout (skip if it's the login endpoint)
    if (response.status === 401 && !endpoint.includes("/auth/login")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/";
      return null;
    }
    if (response.status === 204) {
      return null;
    }
    // 2. Safely read text first so empty responses never crash .json()
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || `Request failed with status ${response.status}` };
    }
    if (!response.ok) {
      throw new Error(data.message || "Invalid username or password");
    }
    return data;
    
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};