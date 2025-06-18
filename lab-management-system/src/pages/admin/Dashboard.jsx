/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck, FaTimes, FaSyncAlt, FaFilter, FaTasks,
  FaClipboardList, FaChevronLeft, FaChevronRight,
  FaHome, FaUsers, FaFlask, FaBell, FaCog,
  FaPlus, FaChartBar, FaCalendarAlt, FaClock
} from "react-icons/fa";

// Generate demo bookings for the current month
function generateBookings(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const bookings = [];
  for (let d = 1; d <= daysInMonth; d++) {
    let status = "free";
    let user = null;
    let info = null;
    if (d % 7 === 1) {
      status = "booked";
      user = "Alice";
      info = "Physics Lab";
    } else if (d % 7 === 2) {
      status = "requested";
      user = "Bob";
      info = "Chemistry Lab";
    } else if (d % 7 === 4) {
      status = "booked";
      user = "Charlie";
      info = "Computer Lab";
    }
    bookings.push({
      date: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      status,
      user,
      info,
    });
  }
  return bookings;
}

const getStatusColor = (status, isToday) => {
  if (isToday) return "bg-accent text-[#042E6F] ring-2 ring-[#042E6F]";
  if (status === "booked") return "bg-[#042E6F] text-white";
  if (status === "requested") return "bg-yellow-400 text-[#042E6F]";
  return "bg-gray-300 text-gray-700";
};

const stats = [
  { label: "Total Labs", value: 8, icon: <FaFlask /> },
  { label: "Active Reservations", value: 12, icon: <FaCalendarAlt /> },
  { label: "Pending Requests", value: 3, icon: <FaClipboardList /> },
  { label: "Registered Users", value: 42, icon: <FaUsers /> },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getSriLankaCurrentDateTime() {
  const now = new Date();
  const sriLankaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
  const date = sriLankaTime.toLocaleDateString("en-GB");
  const time = sriLankaTime.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return {
    date,
    time,
    year: sriLankaTime.getFullYear(),
    month: sriLankaTime.getMonth(),
    day: sriLankaTime.getDate()
  };
}

// Activity feed items
const activityFeed = [
  { user: "Alice Smith", action: "booked", target: "Physics Lab", time: "10 min ago" },
  { user: "Admin", action: "approved", target: "Bob's reservation", time: "1 hour ago" },
  { user: "Charlie Davis", action: "requested", target: "Computer Lab", time: "2 hours ago" },
  { user: "Diana Edwards", action: "cancelled", target: "Chemistry Lab booking", time: "3 hours ago" },
  { user: "System", action: "scheduled", target: "server maintenance", time: "Yesterday" },
];

const Dashboard = () => {
  const [modal, setModal] = useState(null);
  const [dateTime, setDateTime] = useState(getSriLankaCurrentDateTime());
  const [calendarData, setCalendarData] = useState({
    year: dateTime.year,
    month: dateTime.month,
    bookings: generateBookings(dateTime.year, dateTime.month)
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Check screen size to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const dt = getSriLankaCurrentDateTime();
      setDateTime(dt);
      setCalendarData(prev => {
        if (prev.year !== dt.year || prev.month !== dt.month) {
          return {
            year: dt.year,
            month: dt.month,
            bookings: generateBookings(dt.year, dt.month)
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calendar logic
  const daysInMonth = new Date(calendarData.year, calendarData.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarData.year, calendarData.month, 1).getDay();
  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  // Map bookings by date for quick lookup
  const bookingMap = {};
  calendarData.bookings.forEach(b => {
    const day = parseInt(b.date.split("-")[2], 10);
    bookingMap[day] = b;
  });

  // Quick actions with navigation
  const quickActions = [
    {
      label: "Add New Reservation",
      description: "Book a lab for a user or event.",
      color: "bg-[#042E6F] text-white hover:bg-[#021a3a]",
      icon: <FaPlus className="w-6 h-6" />,
      onClick: () => navigate("/requests"),
    },
    {
      label: "View Requests",
      description: "See all pending reservation requests.",
      color: "bg-yellow-400 text-[#042E6F] hover:bg-yellow-300",
      icon: <FaBell className="w-6 h-6" />,
      onClick: () => navigate("/requests"),
    },
    {
      label: "Manage Users",
      description: "Add, edit, or remove users.",
      color: "bg-green-600 text-white hover:bg-green-700",
      icon: <FaUsers className="w-6 h-6" />,
      onClick: () => navigate("/users"),
    },
  ];

  // Mobile bottom navigation
  const mobileNav = [
    { icon: <FaHome />, label: "Home", tab: "overview" },
    { icon: <FaCalendarAlt />, label: "Calendar", tab: "calendar" },
    { icon: <FaChartBar />, label: "Activity", tab: "activity" },
    { icon: <FaCog />, label: "Settings", tab: "settings" },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Responsive greeting header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Admin Dashboard</h1>
          <p className="mb-2 md:mb-0 text-gray-700">Welcome! Here you can manage lab reservations and system settings.</p>
        </div>
        <div className="flex flex-col items-start md:items-end text-sm text-[#042E6F] font-semibold bg-blue-50 p-2 rounded-lg mt-2 md:mt-0">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" /> {dateTime.date}
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" /> {dateTime.time} (Sri Lanka)
          </div>
        </div>
      </div>

      {/* Mobile Tabs (only shown on mobile) */}
      {isMobile && (
        <div className="flex overflow-x-auto mb-4 bg-white p-2 rounded-xl shadow-md">
          <button
            className={`px-4 py-2 flex-shrink-0 rounded-lg mr-2 ${activeTab === "overview" ? "bg-[#042E6F] text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 flex-shrink-0 rounded-lg mr-2 ${activeTab === "calendar" ? "bg-[#042E6F] text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("calendar")}
          >
            Calendar
          </button>
          <button
            className={`px-4 py-2 flex-shrink-0 rounded-lg mr-2 ${activeTab === "activity" ? "bg-[#042E6F] text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`px-4 py-2 flex-shrink-0 rounded-lg ${activeTab === "settings" ? "bg-[#042E6F] text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      )}

      {/* Stats Cards - 2 column on small, 4 column on medium+ screens */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 ${isMobile && activeTab !== "overview" ? "hidden" : ""}`}>
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center border-t-4 border-[#042E6F] bg-white hover:bg-[#F8FAFF] transition-colors"
          >
            <div className="text-[#042E6F] text-2xl mb-2">{stat.icon}</div>
            <span className="text-2xl md:text-3xl font-bold text-[#042E6F]">{stat.value}</span>
            <span className="mt-1 text-sm md:text-base text-gray-600 text-center">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions - 1 column on extra small, 2 column on small, 3 column on medium+ */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 ${isMobile && activeTab !== "overview" ? "hidden" : ""}`}>
        {quickActions.map(action => (
          <button
            key={action.label}
            className={`flex flex-col items-center rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] hover:scale-105 transition ${action.color}`}
            onClick={action.onClick}
            type="button"
          >
            <div className="mb-2">{action.icon}</div>
            <div className="font-bold text-center">{action.label}</div>
            <div className="text-xs opacity-80 text-center">{action.description}</div>
          </button>
        ))}
      </div>

      {/* Calendar Section - Improved Mobile Display */}
      <div className={`mb-6 ${isMobile && activeTab !== "calendar" ? "hidden" : ""}`}>
        <div className="rounded-xl shadow-lg p-4 md:p-8 border-l-4 border-[#042E6F] bg-white">
          <h2 className="text-lg md:text-xl font-bold text-[#042E6F] mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" /> Lab Booking Calendar ({monthNames[calendarData.month]} {calendarData.year})
          </h2>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-[640px] px-4 md:px-0 md:min-w-0">
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Sun</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Mon</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Tue</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Wed</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Thu</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Fri</th>
                    <th className="py-2 text-[#042E6F] text-xs md:text-sm">Sat</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(calendarCells.length / 7) }).map((_, weekIdx) => (
                    <tr key={weekIdx}>
                      {calendarCells.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, idx) => {
                        if (!day) return <td key={idx} />;
                        const booking = bookingMap[day] || { status: "free" };
                        const isToday =
                          calendarData.year === dateTime.year &&
                          calendarData.month === dateTime.month &&
                          day === dateTime.day;
                        return (
                          <td key={idx} className="py-1">
                            <button
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full font-semibold shadow ${getStatusColor(booking.status, isToday)} hover:scale-110 transition`}
                              onClick={() => setModal({ ...booking, day })}
                              title={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            >
                              {day}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 mt-6 justify-center md:justify-start">
            <span className="flex items-center gap-1 text-xs md:text-sm"><span className="w-3 h-3 md:w-4 md:h-4 bg-[#042E6F] inline-block rounded"></span>Booked</span>
            <span className="flex items-center gap-1 text-xs md:text-sm"><span className="w-3 h-3 md:w-4 md:h-4 bg-yellow-400 inline-block rounded"></span>Requested</span>
            <span className="flex items-center gap-1 text-xs md:text-sm"><span className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 inline-block rounded"></span>Free</span>
            <span className="flex items-center gap-1 text-xs md:text-sm"><span className="w-3 h-3 md:w-4 md:h-4 bg-accent inline-block rounded ring-2 ring-[#042E6F]"></span>Today</span>
          </div>
        </div>
      </div>

      {/* Activity Feed - Better Spacing for Mobile */}
      <div className={`mb-6 ${isMobile && activeTab !== "activity" ? "hidden" : ""}`}>
        <div className="rounded-xl shadow-lg p-4 md:p-8 border-l-4 border-[#042E6F] bg-white">
          <h2 className="text-lg md:text-xl font-bold text-[#042E6F] mb-4 flex items-center">
            <FaChartBar className="mr-2" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {activityFeed.map((item, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="bg-[#042E6F] text-white p-2 rounded-full mr-3 flex-shrink-0">
                  {item.action === "booked" && <FaCalendarAlt />}
                  {item.action === "approved" && <FaCheck />}
                  {item.action === "requested" && <FaClipboardList />}
                  {item.action === "cancelled" && <FaTimes />}
                  {item.action === "scheduled" && <FaCog />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base break-words">
                    <span className="font-semibold text-[#042E6F]">{item.user}</span>{" "}
                    {item.action === "booked" && "booked"}
                    {item.action === "approved" && "approved"}
                    {item.action === "requested" && "requested"}
                    {item.action === "cancelled" && "cancelled"}
                    {item.action === "scheduled" && "scheduled"}{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-[#042E6F] hover:underline text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Better Positioning */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t border-gray-200 z-50">
          <div className="flex justify-around">
            {mobileNav.map((item) => (
              <button
                key={item.tab}
                className={`py-3 px-4 flex flex-col items-center justify-center relative ${activeTab === item.tab ? "text-[#042E6F]" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab(item.tab)}
              >
                <div className={`text-xl ${activeTab === item.tab ? "text-[#042E6F]" : "text-gray-500"}`}>
                  {item.icon}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
                {activeTab === item.tab && (
                  <div className="absolute top-0 w-12 h-1 bg-[#042E6F] rounded-b-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal - Better Mobile Responsiveness */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-md border-t-4 border-[#042E6F] bg-white relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-[#042E6F] text-2xl"
              onClick={() => setModal(null)}
              aria-label="Close"
            >&times;</button>
            <h3 className="text-xl font-bold text-[#042E6F] mb-4">Booking Details</h3>
            <div className="mb-2"><b>Date:</b> {monthNames[calendarData.month]} {modal.day}, {calendarData.year}</div>
            <div className="mb-2"><b>Status:</b> <span className="capitalize">{modal.status}</span></div>
            {modal.user && <div className="mb-2"><b>User:</b> {modal.user}</div>}
            {modal.info && <div className="mb-2"><b>Info:</b> {modal.info}</div>}
            {!modal.user && <div className="mb-2 text-gray-400">No booking for this date.</div>}

            <div className="mt-6 flex justify-end">
              <button
                className="bg-[#042E6F] text-white px-4 py-2 rounded-lg"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;