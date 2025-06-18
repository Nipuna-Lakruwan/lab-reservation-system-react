/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import LecturerLayout from "./components/lecturer/LecturerLayout";
import StudentLayout from "./components/student/StudentLayout";

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

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ViewLabs from "./pages/student/ViewLabs";
import BookLab from "./pages/student/BookLab";
import MyBookings from "./pages/student/MyBookings";
import ReservationHistory from "./pages/student/ReservationHistory";
import StudentProfile from "./pages/student/StudentProfile";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PendingApproval from "./pages/auth/PendingApproval";

function App() {
  // Add state to force re-render when authentication state changes
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    userRole: localStorage.getItem("userRole") || "",
    isPending: localStorage.getItem("accountStatus") === "pending"
  });

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
        userRole: localStorage.getItem("userRole") || "",
        isPending: localStorage.getItem("accountStatus") === "pending"
      });
    };

    // This will catch changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Check authentication status periodically
    const checkAuthInterval = setInterval(() => {
      const currentIsAuth = localStorage.getItem("isAuthenticated") === "true";
      const currentRole = localStorage.getItem("userRole") || "";

      if (currentIsAuth !== authState.isAuthenticated || currentRole !== authState.userRole) {
        handleStorageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkAuthInterval);
    };
  }, [authState.isAuthenticated, authState.userRole]);

  // Redirect based on user role
  const getHomePage = () => {
    if (!authState.isAuthenticated) return <Navigate to="/login" />;

    if (authState.userRole === "admin") {
      return (
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      );
    } else if (authState.userRole === "lecturer") {
      return (
        <LecturerLayout>
          <LecturerDashboard />
        </LecturerLayout>
      );
    } else if (authState.userRole === "student") {
      return (
        <StudentLayout>
          <StudentDashboard />
        </StudentLayout>
      );
    }

    // Fallback
    return <Navigate to="/login" />;
  };

  // Protected route component
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && authState.userRole !== requiredRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes - accessible when not logged in */}
        <Route path="/login" element={authState.isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={authState.isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/pending-approval" element={!authState.isPending ? <Navigate to="/login" /> : <PendingApproval />} />

        {/* Home route - redirects based on role */}
        <Route path="/" element={getHomePage()} />

        {/* Admin Routes */}
        <Route path="/users" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><UserManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/requests" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><Requests /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/labs" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><Labs /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/reservations" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><Reservations /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/audit-logs" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><AuditLogs /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><Settings /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin-profile" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><AdminProfile /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/user-profiles" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><UserProfiles /></AdminLayout>
          </ProtectedRoute>
        } />

        {/* Lecturer Routes */}
        <Route path="/lecturer" element={
          <ProtectedRoute requiredRole="lecturer">
            <LecturerLayout><LecturerDashboard /></LecturerLayout>
          </ProtectedRoute>
        } />
        <Route path="/lecturer/request-reservation" element={
          <ProtectedRoute requiredRole="lecturer">
            <LecturerLayout><RequestReservation /></LecturerLayout>
          </ProtectedRoute>
        } />
        <Route path="/lecturer/my-reservations" element={
          <ProtectedRoute requiredRole="lecturer">
            <LecturerLayout><MyReservations /></LecturerLayout>
          </ProtectedRoute>
        } />
        <Route path="/lecturer/approved-sessions" element={
          <ProtectedRoute requiredRole="lecturer">
            <LecturerLayout><ApprovedSessions /></LecturerLayout>
          </ProtectedRoute>
        } />
        <Route path="/lecturer/profile" element={
          <ProtectedRoute requiredRole="lecturer">
            <LecturerLayout><LecturerProfile /></LecturerLayout>
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><StudentDashboard /></StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/view-labs" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><ViewLabs /></StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/book-lab" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><BookLab /></StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/my-bookings" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><MyBookings /></StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/reservation-history" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><ReservationHistory /></StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><StudentProfile /></StudentLayout>
          </ProtectedRoute>
        } />

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to={authState.isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
