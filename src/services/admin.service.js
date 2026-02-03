import api from "../lib/api";

const adminApi = {
  /* =========================
     USERS
     ========================= */
  getUsers: (params = {}) => api.get("/admin/users", { params }),

  // getUserDetails: (userId) => api.get(`/admin/users/${userId}`),
  getUser: (userId) => api.get(`/admin/users/${userId}`),

  createUser: (data) => api.post("/admin/users", data),

  updateUser: (userId, data) =>
    api.put(`/admin/users/${userId}`, data),

  deleteUser: (userId) =>
    api.delete(`/admin/users/${userId}`),

  bulkAction: (data) =>
    api.post("/admin/users/bulk", data),

  /* =========================
     DASHBOARD STATS
     ========================= */
  index: () =>
    api.get("/admin/stats/summary"),
  getStats: () =>
    api.get("/admin/stats"),

  getUserGrowth: (days = 7) =>
    api.get("/admin/stats/user-growth", {
      params: { days },
    }),

  getSystemHealth: () =>
    api.get("/admin/stats/system-health"),

  getActivityLogs: (limit = 20) =>
    api.get("/admin/stats/activity-logs", {
      params: { limit },
    }),

  /* =========================
     RESUMES
     ========================= */
  getResumes: (params = {}) =>
    api.get("/admin/resumes", { params }),
};

export default adminApi;
