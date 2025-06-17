/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClock, FaUsers, FaFlask, FaCalendarCheck,
  FaHistory, FaBolt, FaSyncAlt, FaClipboardCheck,
  FaUserPlus, FaChartBar
} from "react-icons/fa";

// Demo requests data
const initialRequests = [
  {
    id: 1,
    requester: "Alice",
    role: "Student",
    lab: "Physics Lab",
    date: "2025-06-20",
    time: "09:00 - 11:00",
    purpose: "Lab practical",
  },
  {
    id: 2,
    requester: "Bob",
    role: "Lecturer",
    lab: "Chemistry Lab",
    date: "2025-06-21",
    time: "13:00 - 15:00",
    purpose: "Special session",
  },
];

// Demo activity data
const activityData = [
  { id: 1, text: "New user registered: James Smith", time: "10 minutes ago" },
  { id: 2, text: "Reservation approved for Chemistry Lab", time: "25 minutes ago" },
  { id: 3, text: "Bob requested Computer Lab access", time: "1 hour ago" },
];

const AdminDashboard = () => {
  const [approvalModal, setApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState({
    requests: false,
    activity: false
  });

  const handleRefreshRequests = () => {
    setLoading(prev => ({ ...prev, requests: true }));
    // Simulate API call
    setTimeout(() => setLoading(prev => ({ ...prev, requests: false })), 1000);
  };

  const handleApprovalClick = (request) => {
    setSelectedRequest(request);
    setApprovalModal(true);
  };

  const statCards = [
    { id: "pending-count", value: 3, label: "Pending Requests", icon: <FaClock />, className: "pending" },
    { id: "users-count", value: 42, label: "Total Users", icon: <FaUsers />, className: "users" },
    { id: "labs-count", value: 8, label: "Labs", icon: <FaFlask />, className: "labs" },
    { id: "active-count", value: 12, label: "Active Reservations", icon: <FaCalendarCheck />, className: "active" },
  ];

  const quickActions = [
    { href: "/requests", icon: <FaClipboardCheck />, label: "Manage Requests" },
    { href: "/users", icon: <FaUserPlus />, label: "Add Users" },
    { href: "/labs", icon: <FaFlask />, label: "Manage Labs" },
    { href: "#", icon: <FaChartBar />, label: "Generate Reports", id: "generate-report-btn" },
  ];

  return (
    <>
      {/* Dashboard Summary */}
      <section className="dashboard-summary grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(card => (
          <div key={card.id} className={`summary-card ${card.className} bg-white rounded-lg shadow-md p-5 flex items-center`}>
            <span className="text-3xl mr-4 text-[#042E6F]">{card.icon}</span>
            <div className="summary-details">
              <h3 id={card.id} className="text-2xl font-bold text-[#042E6F] m-0">{card.value}</h3>
              <p className="text-gray-600 m-0">{card.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pending Requests */}
      <section className="pending-requests mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="section-header flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#042E6F] flex items-center m-0">
            <FaClock className="mr-2" /> Pending Approval Requests
          </h2>
          <button
            id="refresh-requests"
            className="btn-secondary flex items-center bg-gray-200 hover:bg-gray-300 text-[#042E6F] px-4 py-2 rounded transition-colors border-0 cursor-pointer"
            onClick={handleRefreshRequests}
          >
            <FaSyncAlt className={`mr-2 ${loading.requests ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
        <div id="requests-container">
          <table className="dashboard-table w-full border-collapse" id="pending-table">
            <thead>
              <tr className="bg-[#042E6F] text-white">
                <th className="py-2 px-4 text-left">Requester</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Lab Name</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody id="pending-tbody">
              {loading.requests ? (
                <tr>
                  <td colSpan={7} className="loading-cell text-center py-8">
                    <div className="loading-spinner inline-block w-6 h-6 border-4 border-[#042E6F33] border-t-[#042E6F] rounded-full animate-spin mr-2"></div>
                    <span>Loading pending requests...</span>
                  </td>
                </tr>
              ) : initialRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">No pending requests</td>
                </tr>
              ) : (
                initialRequests.map((req, index) => (
                  <tr key={req.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 border-b border-gray-100">{req.requester}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{req.role}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{req.lab}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{req.date}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{req.time}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{req.purpose}</td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <button
                        className="bg-[#042E6F] text-white px-3 py-1 rounded hover:bg-[#06419d] transition-colors border-0 cursor-pointer"
                        onClick={() => handleApprovalClick(req)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-[#042E6F] flex items-center mb-4">
          <FaBolt className="mr-2" /> Quick Actions
        </h2>
        <div className="actions-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(action => (
            <Link
              key={action.label}
              to={action.href}
              className="action-card bg-gray-50 hover:bg-gray-100 transition-colors p-5 rounded-lg flex flex-col items-center justify-center shadow-sm"
              id={action.id}
            >
              <span className="text-3xl mb-3 text-[#042E6F]">{action.icon}</span>
              <span className="font-medium text-[#042E6F]">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-[#042E6F] flex items-center mb-4">
          <FaHistory className="mr-2" /> Recent Activity
        </h2>
        <div id="activity-container" className="activity-list">
          {loading.activity ? (
            <div className="loading-activity text-center py-6">
              <div className="loading-spinner inline-block w-6 h-6 border-4 border-[#042E6F33] border-t-[#042E6F] rounded-full animate-spin mr-2"></div>
              <span>Loading recent activity...</span>
            </div>
          ) : (
            <ul className="list-none p-0 m-0 divide-y divide-gray-100">
              {activityData.map(activity => (
                <li key={activity.id} className="py-3 flex justify-between">
                  <span>{activity.text}</span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Approval Modal */}
      {approvalModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="modal-content bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="modal-header bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="m-0 text-lg font-semibold">Request Approval</h3>
              <button
                className="modal-close text-2xl text-white hover:text-gray-200 bg-transparent border-0 cursor-pointer"
                onClick={() => setApprovalModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body p-6">
              <div id="approval-details" className="mb-4">
                {selectedRequest && (
                  <div className="grid grid-cols-2 gap-3">
                    <div><b>Requester:</b> {selectedRequest.requester}</div>
                    <div><b>Role:</b> {selectedRequest.role}</div>
                    <div><b>Lab:</b> {selectedRequest.lab}</div>
                    <div><b>Date:</b> {selectedRequest.date}</div>
                    <div><b>Time:</b> {selectedRequest.time}</div>
                    <div className="col-span-2"><b>Purpose:</b> {selectedRequest.purpose}</div>
                  </div>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="approval-notes" className="block mb-2 font-medium">Notes (Optional):</label>
                <textarea
                  id="approval-notes"
                  className="w-full border border-gray-300 rounded p-2 min-h-[100px]"
                  placeholder="Add any notes for this approval"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                id="reject-btn"
                className="btn-danger bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors border-0 cursor-pointer"
                onClick={() => setApprovalModal(false)}
              >
                Reject
              </button>
              <button
                id="approve-btn"
                className="btn-primary bg-[#042E6F] text-white px-4 py-2 rounded hover:bg-[#06419d] transition-colors border-0 cursor-pointer"
                onClick={() => setApprovalModal(false)}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
