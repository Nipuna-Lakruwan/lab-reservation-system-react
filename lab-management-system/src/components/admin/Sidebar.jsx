import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaClock, FaUsers, FaFlask, FaCalendarAlt, FaHistory, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";

const admin = {
  name: "Admin User",
  role: "Department Coordinator",
  image: "/assets/img/default-user.png"
};

const navLinks = [
  { to: "/", label: "Dashboard", icon: <FaHome /> },
  { to: "/requests", label: "Pending Requests", icon: <FaClock /> },
  { to: "/users", label: "Users", icon: <FaUsers /> },
  { to: "/labs", label: "Labs", icon: <FaFlask /> },
  { to: "/reservations", label: "All Reservations", icon: <FaCalendarAlt /> },
  { to: "/audit-logs", label: "Audit Logs", icon: <FaHistory /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar = ({ open = true, onClose }) => {
  const location = useLocation();
  return (
    <aside className={`sidebar bg-white shadow-lg fixed h-full z-50 w-[260px] transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="sidebar-header">
        <div className="user-profile flex flex-col items-center py-5 w-full border-b border-gray-200">
          <img src={admin.image} alt="User Profile" className="profile-image w-20 h-20 rounded-full object-cover border-4 border-[#042E6F33]" />
          <h3 className="user-name font-bold text-[#042E6F] text-lg mt-2">{admin.name}</h3>
          <p className="user-role text-gray-500 text-sm">{admin.role}</p>
        </div>
        {/* {onClose && (
          <button
            className="sidebar-close absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
            onClick={onClose}
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
            <Link to="/login" className="flex items-center px-5 py-3 w-full font-medium text-red-600 hover:bg-red-50">
              <span className="mr-3 w-6 text-center"><FaSignOutAlt /></span> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
