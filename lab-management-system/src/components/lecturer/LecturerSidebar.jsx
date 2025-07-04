/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardCheck,
  FaPlus,
  FaUser,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaTimes
} from "react-icons/fa";

// Demo lecturer data
const lecturer = {
  name: "Dr. Sarah Johnson",
  role: "Lecturer",
  image: "https://randomuser.me/api/portraits/women/44.jpg"
};

const navLinks = [
  { to: "/lecturer", label: "Dashboard", icon: <FaHome /> },
  { to: "/lecturer/request-reservation", label: "Request Reservation", icon: <FaPlus /> },
  { to: "/lecturer/my-reservations", label: "My Reservations", icon: <FaCalendarAlt /> },
  { to: "/lecturer/approved-sessions", label: "Approved Sessions", icon: <FaClipboardCheck /> },
  { to: "/lecturer/profile", label: "My Profile", icon: <FaUser /> },
];

const LecturerSidebar = ({ open = true, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    // Navigate to login page
    navigate("/login");
  };

  return (
    <>
      <aside className={`sidebar bg-white shadow-lg fixed h-full z-50 w-[260px] transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="sidebar-header">
          <div className="user-profile flex flex-col items-center py-5 w-full border-b border-gray-200">
            <img src={lecturer.image} alt="User Profile" className="profile-image w-20 h-20 rounded-full object-cover border-4 border-[#042E6F33]" />
            <h3 className="user-name font-bold text-[#042E6F] text-lg mt-2">{lecturer.name}</h3>
            <p className="user-role text-gray-500 text-sm flex items-center">
              <FaChalkboardTeacher className="mr-1" /> {lecturer.role}
            </p>
          </div>
          {/* {onClose && (
            <button
              className="sidebar-close absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          )} */}
        </div>
        <nav className="sidebar-nav py-4">
          <ul className="flex flex-col w-full">
            {navLinks.map(link => (
              <li key={link.to} className={`w-full ${location.pathname === link.to ? "active" : ""}`}>
                <Link
                  to={link.to}
                  className={`flex items-center px-5 py-3 w-full font-medium transition-all ${location.pathname === link.to
                    ? "bg-[#042E6F0D] text-[#042E6F] border-l-4 border-[#042E6F]"
                    : "text-[#555] hover:bg-[#042E6F0D] hover:text-[#042E6F]"
                    }`}
                >
                  <span className="mr-3 w-6 text-center">{link.icon}</span> {link.label}
                </Link>
              </li>
            ))}
            <li className="logout w-full mt-6 border-t border-gray-200 pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-5 py-3 w-full font-medium text-red-600 hover:bg-red-50"
              >
                <span className="mr-3 w-6 text-center"><FaSignOutAlt /></span> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Backdrop for mobile - only shown when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default LecturerSidebar;
