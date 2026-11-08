// src/services/boothService.js
import { api } from "./api";

export const boothService = {
  // GET /api/booth/summary
  getSummary: () => {
    return api.get("/booth/summary");
  },

  // GET /api/booth/archive/summary
  getArchiveSummary: () => {
    return api.get("/booth/archive/summary");
  },

  // GET /api/booth/allBooth?page=0&size=10&status=...&type=...
  getAllBooths: (page = 0, size = 10, status = null, type = null, search = "") => {
    let query = `/booth/allBooth?page=${page}&size=${size}`;
    if (status) query += `&status=${status}`;
    if (type) query += `&type=${type}`;
    if(search && search.trim() !== "") {
      query += `&search=${encodeURIComponent(search.trim())}`;
    }
    return api.get(query);
  },

  // GET /api/booth/allDeletedBooth?page=0&size=5
  getAllDeletedBooths: (page = 0, size = 5, type = null, search = "") => {
    let query = `/booth/allDeletedBooth?page=${page}&size=${size}`;
    if (type) query += `&boothType=${type}`;
    if (search && search.trim() !== "") {
      query += `&search=${encodeURIComponent(search.trim())}`;
    }
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

  // PATCH /api/booth/updateInfo/{boothId}
  updateBoothInfo: (boothId, infoData) => {
    return api.patch(`/booth/updateInfo/${boothId}`, infoData);
  },

  // PATCH /api/booth/restore/{boothId}
  restoreBooth: (boothId) => {
    return api.patch(`/booth/restore/${boothId}`);
  },

  // DELETE /api/booth/{boothId}
  deleteBooth: (boothId) => {
    return api.delete(`/booth/${boothId}`);
  },
};
