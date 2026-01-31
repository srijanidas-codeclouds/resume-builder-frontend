import React from "react";
import LandingPage from "./pages/LandingPage.jsx";
import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import ResumeEditor from "./pages/ResumeEditor.jsx";
import { AdminRoute, ProtectedRoute } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/User/UserProfile.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import ProfilePage from "./pages/User/UserSettings.jsx";
import UserSettings from "./pages/User/UserSettings.jsx";
import Users from "./pages/Admin/Users.jsx";
import Stats from "./pages/Admin/Stats.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import NotFound from "./pages/404.jsx";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="user">
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/my-resumes" element={<UserDashboard />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
          <Route path="/dashboard/settings" element={<UserSettings />} />
        </Route>

        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute allowedRole="user">
              <ResumeEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stats" element={<Stats />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
