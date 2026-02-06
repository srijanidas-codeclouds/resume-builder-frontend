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

  suspendUser: (id) => api.post(`/admin/users/${id}/suspend`),
  unsuspendUser: (id) => api.post(`/admin/users/${id}/activate`),

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
  // Revenue data for MRR/ARR tracking
  getRevenueData: (months = 6) =>
    api.get("/admin/stats/revenue", {
      params: { months },
    }),
  // Membership distribution (pie chart)
  getMembershipDistribution: () =>
    api.get("/admin/stats/membership-distribution"),

  // Engagement metrics (DAU, WAU, MAU)
  getEngagementMetrics: () =>
    api.get("/admin/stats/engagement-metrics"),

  // Top users by resume count
  getTopUsers: () => api.get("/admin/stats/top-users"),

  // Resume creation trends
  getResumeCreationTrends: (days = 14) =>
    api.get("/admin/stats/resume-trends", {
      params: { days },
    }),
  

  getSystemHealth: () =>
    api.get("/admin/stats/system-health"),

  getActivityLogs: (limit = 20) =>
    api.get("/admin/stats/activity-logs", {
      params: { limit },
    }),

  // Clear dashboard cache (admin only)
  clearCache: () => api.post("/admin/stats/clear-cache"),

  /* =========================
     RESUMES
     ========================= */
  getResumes: (params = {}) =>
    api.get("/admin/resumes", { params }),

  getResume: (resumeId) =>
    api.get(`/admin/resumes/${resumeId}`),

  deleteResume: (resumeId) =>
    api.delete(`/admin/resumes/${resumeId}`),
};

export default adminApi;
