/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

const StudentHeader = ({ onSidebarToggle }) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your lab booking request was approved", time: "5 min ago", read: false },
    { id: 2, text: "New lab materials uploaded for CS101", time: "1 hour ago", read: false },
    { id: 3, text: "Physics Lab session rescheduled", time: "3 hours ago", read: false },
    { id: 4, text: "Complete your lab feedback survey", time: "1 day ago", read: true }
  ]);

  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Fetch user data from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { name: "John Smith" };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Mark notification as read
  const handleNotificationClick = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  return (
    <header className="dashboard-header bg-[#042E6F] shadow flex items-center px-6 py-3 sticky top-0 z-40">
      <div className="header-left flex items-center">
        {onSidebarToggle && (
          <button className="menu-toggle mr-4 text-white text-xl bg-transparent border-0 cursor-pointer" onClick={onSidebarToggle}>
            <FaBars />
          </button>
        )}
        <div className="logo-container flex items-center">
          <img
            src="/BCI logo_blue.png"
            alt="Logo"
            className="header-logo max-h-[40px] bg-white p-1 rounded shadow mr-3"
          />
          <h1 className="text-white text-xl font-bold m-0">
            Student Portal
          </h1>
        </div>
      </div>
      <div className="header-controls ml-auto flex items-center">
        {/* Notifications dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            className="notification-btn text-white text-xl bg-transparent border-0 cursor-pointer relative p-2"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <FaBell />
            {notificationCount > 0 && (
              <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
              <div className="p-3 bg-[#F0F4FF] border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-[#042E6F]">Notifications</h3>
                <button
                  className="text-xs text-[#042E6F] hover:underline"
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    setNotificationCount(0);
                  }}
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="text-sm">{notification.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User dropdown menu */}
        <div className="relative ml-4" ref={userMenuRef}>
          <button
            className="flex items-center text-white hover:text-gray-200"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <FaUserCircle className="text-2xl mr-2" />
            <span className="font-medium hidden md:block">{user.name}</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
              <div className="p-3 bg-[#F0F4FF] border-b border-gray-200">
                <div className="font-semibold text-[#042E6F]">{user.name}</div>
                <div className="text-xs text-gray-600">{user.email}</div>
              </div>
              <div className="py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => navigate('/student/profile')}
                >
                  <FaUser className="mr-2" /> My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;