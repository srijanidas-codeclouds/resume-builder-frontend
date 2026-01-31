import api from "../lib/api";


const adminApi = {
  getUsers: (params) => api.get("/admin/users", { params }),
  getUserDetails: (id) => api.get(`/admin/users/${id}`),
  getStats: () => api.get("/admin/stats"),
  createUser: data => api.post("/admin/users", data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: id => api.delete(`/admin/users/${id}`),
  bulkAction: data => api.post("/admin/users/bulk", data),
};

export default adminApi;

