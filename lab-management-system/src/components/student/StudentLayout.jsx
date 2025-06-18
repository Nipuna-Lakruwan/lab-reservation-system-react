/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect, useRef } from "react";
import StudentHeader from "./StudentHeader";
import StudentSidebar from "./StudentSidebar";

const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mainContentRef = useRef(null);

  // Check if we're on mobile and close sidebar by default
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle clicks outside the sidebar to close it (only on mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isMobile &&
        sidebarOpen &&
        mainContentRef.current &&
        mainContentRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobile, sidebarOpen]);

  return (
    <div className="dashboard-layout flex min-h-screen bg-[#f8f9fa]">
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`main-content flex-1 transition-all duration-300 ${sidebarOpen && !isMobile ? "ml-[260px]" : "ml-0"}`}
        ref={mainContentRef}
      >
        <StudentHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Backdrop overlay for mobile - only shown when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default StudentLayout;
