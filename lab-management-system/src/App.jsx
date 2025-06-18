/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import LecturerLayout from "./components/lecturer/LecturerLayout";

// Admin pages
import Dashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import Requests from "./pages/admin/Requests";
import AdminProfile from "./pages/admin/AdminProfile";
import UserProfiles from "./pages/admin/UserProfiles";
import Labs from "./pages/admin/Labs";
import Reservations from "./pages/admin/Reservations";
import AuditLogs from "./pages/admin/AuditLogs";
import Settings from "./pages/admin/Settings";

// Lecturer pages
import LecturerDashboard from "./pages/lecturer/LecturerDashboard";
import RequestReservation from "./pages/lecturer/RequestReservation";
import MyReservations from "./pages/lecturer/MyReservations";
import ApprovedSessions from "./pages/lecturer/ApprovedSessions";
import LecturerProfile from "./pages/lecturer/LecturerProfile";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PendingApproval from "./pages/auth/PendingApproval";

function App() {
  // This would normally be handled by an auth context or state management
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole") || "admin"; // Default to admin for demo
  const isPending = localStorage.getItem("accountStatus") === "pending";

  // Redirect based on user role
  const getHomePage = () => {
    if (!isAuthenticated) return <Navigate to="/login" />;

    if (userRole === "admin") {
      return (
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      );
    } else if (userRole === "lecturer") {
      return (
        <LecturerLayout>
          <LecturerDashboard />
        </LecturerLayout>
      );
    }

    // Fallback
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes - accessible when not logged in */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/pending-approval" element={!isPending ? <Navigate to="/login" /> : <PendingApproval />} />

        {/* Home route - redirects based on role */}
        <Route path="/" element={getHomePage()} />

        {/* Admin Routes */}
        {isAuthenticated && userRole === "admin" && (
          <>
            <Route path="/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            <Route path="/requests" element={<AdminLayout><Requests /></AdminLayout>} />
            <Route path="/labs" element={<AdminLayout><Labs /></AdminLayout>} />
            <Route path="/reservations" element={<AdminLayout><Reservations /></AdminLayout>} />
            <Route path="/audit-logs" element={<AdminLayout><AuditLogs /></AdminLayout>} />
            <Route path="/settings" element={<AdminLayout><Settings /></AdminLayout>} />
            <Route path="/admin-profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
            <Route path="/user-profiles" element={<AdminLayout><UserProfiles /></AdminLayout>} />
          </>
        )}

        {/* Lecturer Routes */}
        {isAuthenticated && userRole === "lecturer" && (
          <>
            <Route path="/lecturer" element={<LecturerLayout><LecturerDashboard /></LecturerLayout>} />
            <Route path="/lecturer/request-reservation" element={<LecturerLayout><RequestReservation /></LecturerLayout>} />
            <Route path="/lecturer/my-reservations" element={<LecturerLayout><MyReservations /></LecturerLayout>} />
            <Route path="/lecturer/approved-sessions" element={<LecturerLayout><ApprovedSessions /></LecturerLayout>} />
            <Route path="/lecturer/profile" element={<LecturerLayout><LecturerProfile /></LecturerLayout>} />
          </>
        )}

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
