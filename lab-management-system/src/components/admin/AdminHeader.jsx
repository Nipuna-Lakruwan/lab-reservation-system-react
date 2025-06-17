import React from "react";
import { FaBars, FaBell } from "react-icons/fa";

const AdminHeader = ({ onSidebarToggle }) => (
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
          Department Coordinator Dashboard
        </h1>
      </div>
    </div>
    <div className="header-controls ml-auto">
      <button className="notification-btn text-white text-xl bg-transparent border-0 cursor-pointer relative p-2">
        <FaBell />
        {/* <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
      </button>
    </div>
  </header>
);

export default AdminHeader;
