import api from "../lib/api"; 
export const resumeService = { 
   // ====================== // FETCH // ====================== 
   getAll: () => api.get("users/resumes"), 
   getById: (id) => api.get(`users/resumes/${id}`), 
   getTemplates: () => api.get("/resume-templates"), 
   // ====================== // CREATE // ====================== 
   create: (payload) => api.post("users/resumes", payload), 
   // ====================== // UPDATE (EDITOR SAFE) // ====================== 
   update: (id, payload) => api.put(`users/resumes/${id}`, payload), // ✅ PATCH, not PUT 
   // // ====================== // ACTIONS // ====================== 
   delete: (id) => api.delete(`users/resumes/${id}`), publish: (id) => api.post(`users/resumes/${id}/publish`), 
   unpublish: (id) => api.post(`users/resumes/${id}/draft`), // optional but clean 
   duplicate: (id) => api.post(`users/resumes/${id}/duplicate`), }; 
   