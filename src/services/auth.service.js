import api from "../lib/api";

export const AuthService = {
  register(payload) {
    return api.post("/register", payload);
  },

  login(payload) {
    return api.post("/login", payload);
  },

  forgotPassword(email) {
    return api.post("/forgot-password", { email });
  },

  resetPassword(payload) {
    return api.post("/reset-password", payload);
  },

  logout() {
    return api.post("/logout");
  },
};

export default AuthService;