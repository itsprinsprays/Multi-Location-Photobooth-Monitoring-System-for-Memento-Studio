import { api } from "./api";

export const authService = {
  login: async (username, password) => {
    const data = await api.post("/auth/login", { username, password });
    
    // Save tokens and user info in localStorage
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify({
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        username: data.username,
        role: data.role
      }));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  }
};