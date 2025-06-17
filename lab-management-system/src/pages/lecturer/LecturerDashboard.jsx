/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt, FaClock, FaChevronRight,
  FaFlask, FaChartBar, FaClipboardCheck, 
  FaExclamationTriangle, FaPlus, FaCalendarCheck
} from "react-icons/fa";

// Sample upcoming reservations
const upcomingReservations = [
  {
    id: 1,
    lab: "Physics Lab",
    date: "2025-06-22",
    time: "10:00 - 12:00",
    status: "Approved",
    course: "PHY301: Advanced Physics"
  },
  {
    id: 2,
    lab: "Computer Lab A",
    date: "2025-06-25",
    time: "14:00 - 16:00",
    status: "Pending",
    course: "CS101: Introduction to Programming"
  },
  {
    id: 3,
    lab: "Chemistry Lab",
    date: "2025-06-28",
    time: "09:00 - 11:00",
    status: "Approved",
    course: "CHM202: Organic Chemistry"
  }
];

// Sample statistics
const lecturerStats = [
  { label: "Total Reservations", value: 12, icon: <FaCalendarAlt />, color: "bg-blue-500" },
  { label: "Upcoming Sessions", value: 3, icon: <FaCalendarCheck />, color: "bg-green-600" },
  { label: "Pending Requests", value: 1, icon: <FaExclamationTriangle />, color: "bg-yellow-400" }
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

const LecturerDashboard = () => {
  const [dateTime, setDateTime] = useState(getSriLankaCurrentDateTime());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Get user from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { name: "Lecturer" };

  // Check screen size to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getSriLankaCurrentDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date for displaying
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="pb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Welcome, {user.name}</h1>
          <p className="mb-2 md:mb-0 text-gray-700">Manage your lab reservations and scheduled sessions.</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
        {lecturerStats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-4 md:p-6 flex items-center border-l-4 border-[#042E6F] bg-white hover:bg-[#F8FAFF] transition-colors`}
          >
            <div className={`${stat.color} text-white p-3 md:p-4 rounded-xl mr-4`}>
              {stat.icon}
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-[#042E6F]">{stat.value}</span>
              <span className="text-sm md:text-base text-gray-600">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <h2 className="text-lg md:text-xl font-bold text-[#042E6F] mb-4 flex items-center">
          <FaChartBar className="mr-2" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/lecturer/request-reservation')}
            className="flex items-center p-4 rounded-lg bg-[#042E6F] text-white hover:bg-[#021E47] transition shadow"
          >
            <div className="bg-blue-700 p-3 rounded-lg mr-4">
              <FaPlus />
            </div>
            <div className="text-left">
              <span className="block font-bold">New Reservation</span>
              <span className="text-xs opacity-80">Book a lab for a session</span>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/lecturer/my-reservations')}
            className="flex items-center p-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow"
          >
            <div className="bg-green-700 p-3 rounded-lg mr-4">
              <FaCalendarAlt />
            </div>
            <div className="text-left">
              <span className="block font-bold">My Reservations</span>
              <span className="text-xs opacity-80">View all your bookings</span>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/lecturer/approved-sessions')}
            className="flex items-center p-4 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition shadow"
          >
            <div className="bg-yellow-600 p-3 rounded-lg mr-4">
              <FaClipboardCheck />
            </div>
            <div className="text-left">
              <span className="block font-bold">Approved Sessions</span>
              <span className="text-xs opacity-80">See approved lab sessions</span>
            </div>
          </button>
        </div>
      </div>

      {/* Upcoming Reservations */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold text-[#042E6F] flex items-center">
            <FaCalendarCheck className="mr-2" /> Upcoming Reservations
          </h2>
          <button 
            onClick={() => navigate('/lecturer/my-reservations')}
            className="text-[#042E6F] hover:underline text-sm font-medium flex items-center"
          >
            View All <FaChevronRight className="ml-1 text-xs" />
          </button>
        </div>

        {upcomingReservations.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You don't have any upcoming reservations.</p>
            <button 
              onClick={() => navigate('/lecturer/request-reservation')}
              className="mt-2 text-[#042E6F] hover:underline"
            >
              Book a lab now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingReservations.map(reservation => (
              <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex flex-col md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-3">
                      <FaFlask className="text-[#042E6F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#042E6F]">{reservation.lab}</h3>
                      <p className="text-sm text-gray-600">{reservation.course}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-1 text-gray-400" />
                    {formatDate(reservation.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-1 text-gray-400" />
                    {reservation.time}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help Box */}
      <div className="bg-blue-50 rounded-xl shadow p-4 md:p-6 border-l-4 border-[#042E6F]">
        <h2 className="text-lg font-bold text-[#042E6F] mb-2">Quick Tips</h2>
        <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
          <li>Plan ahead! Book labs at least 48 hours in advance.</li>
          <li>Check your email for reservation status updates.</li>
          <li>If you need to cancel a reservation, please do so at least 24 hours before the scheduled time.</li>
          <li>Contact the lab coordinator if you need special equipment for your session.</li>
        </ul>
      </div>
    </div>
  );
};

export default LecturerDashboard;
