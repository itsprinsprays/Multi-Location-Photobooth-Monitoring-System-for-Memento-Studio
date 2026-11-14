// src/services/employeeService.js
import { api } from "./api";

export const employeeService = {
  // GET /api/employee/summary (Active counts: total, admins, staff)
  getSummary: () => {
    return api.get("/employee/summary");
  },

  // GET /api/employee/allEmployee?page=0&size=10&role=...&search=...
  getAllEmployees: (page = 0, size = 10, employeeRole = null, workStatus = null, search = "") => {
    let query = `/employee/allEmployee?page=${page}&size=${size}`;
    if (employeeRole) query += `&employeeRole=${employeeRole}`;
    if (workStatus) query += `&workStatus=${workStatus}`;
    if (search && search.trim() !== "") {
      query += `&search=${encodeURIComponent(search.trim())}`;
    }
    return api.get(query);
  },

  // GET /api/employee/{employeeId}
  getEmployeeById: (employeeId) => {
    return api.get(`/employee/${employeeId}`);
  },

  // POST /api/employee/create
  createEmployee: (employeeData) => {
    return api.post("/employee/create", employeeData);
  },

  // PATCH /api/employee/updateInfo/{employeeId}
  updateEmployeeInfo: (employeeId, employeeData) => {
    return api.patch(`/employee/updateEmployee/${employeeId}`, employeeData);
  },

  // DELETE /api/employee/{employeeId} (Soft-deletes/archives an employee)
  deleteEmployee: (employeeId) => {
    return api.delete(`/employee/${employeeId}`);
  },

  // PATCH /api/employee/restore/{employeeId} (Restores an archived employee)
  restoreEmployee: (employeeId) => {
    return api.patch(`/employee/restore/${employeeId}`);
  },

  // GET /api/employee/allDeletedEmployee?page=0&size=5
  getAllDeletedEmployees: (page = 0, size = 5, search = "") => {
    let query = `/employee/allDeletedEmployee?page=${page}&size=${size}`;
    if (search && search.trim() !== "") {
      query += `&search=${encodeURIComponent(search.trim())}`;
    }
    return api.get(query);
  },
};
