import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthService } from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const isAuthenticated = !!user;

  // 🔁 Restore user on refresh
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // 👑 derived state (ADMIN CHECK)
  const isAdmin = user?.role === "admin";

const canManageUsers = isAdmin;
const canSuspendUsers = isAdmin;
const canDeleteUsers = isAdmin;



  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await AuthService.login(credentials);
      if (!res.data.token) {
      throw new Error("No token returned from backend");
      }
      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      await AuthService.register(data);
      // 🚫 DO NOT set token or user here
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  setLoading(true);
  try {
    // Attempt to notify the server to invalidate the token
    await AuthService.logout();
  } catch (err) {
    console.error("Logout API failed, but clearing local session anyway.", err);
    // We catch the error here so it doesn't become "Uncaught (in promise)"
  } finally {
    // These must happen regardless of API success or failure
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
    navigate("/signin", { replace: true });
  }
};



  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        isAdmin,
        logout,
        loading,
        canManageUsers,
        canSuspendUsers,
        canDeleteUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // 1. Not logged in? Go to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2. Logged in as Admin trying to access User routes? Redirect to Admin panel
  if (allowedRole === 'user' && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard/my-resumes" replace />;
  }

  return children;
};

export default AuthContext;