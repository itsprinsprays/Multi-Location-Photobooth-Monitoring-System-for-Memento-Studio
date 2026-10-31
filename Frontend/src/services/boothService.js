// src/services/boothService.js
import { api } from "./api";

export const boothService = {
  // GET /api/booth/summary
  getSummary: () => {
    return api.get("/booth/summary");
  },

  // GET /api/booth/allBooth?page=0&size=10&status=...
  getAllBooths: (page = 0, size = 10, status = null) => {
    let query = `/booth/allBooth?page=${page}&size=${size}`;
    if (status) query += `&status=${status}`;
    return api.get(query);
  },

  // GET /api/booth/{boothId}
  getBoothById: (boothId) => {
    return api.get(`/booth/${boothId}`);
  },

  // POST /api/booth/create
  createBooth: (boothData) => {
    return api.post("/booth/create", boothData);
  },

  // PATCH /api/booth/status/{boothId}
  updateBoothStatus: (boothId, statusData) => {
    return api.patch(`/booth/status/${boothId}`, statusData);
  },

  // DELETE /api/booth/{boothId}
  deleteBooth: (boothId) => {
    return api.delete(`/booth/${boothId}`);
  },
};