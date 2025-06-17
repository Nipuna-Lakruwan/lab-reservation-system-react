/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { FaSearch, FaFilter, FaCalendarAlt, FaClock, FaFlask, FaInfoCircle, FaTimes, FaEye, FaTrashAlt, FaUsers } from "react-icons/fa";

// Sample reservation data
const initialReservations = [
  {
    id: 1,
    lab: "Physics Lab",
    course: "PHY301: Advanced Physics",
    date: "2025-06-22",
    time: "10:00 - 12:00",
    status: "Approved",
    requestDate: "2025-06-15",
    studentCount: 25,
    purpose: "Practical demonstration of wave properties",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench"]
  },
  {
    id: 2,
    lab: "Computer Lab A",
    course: "CS101: Introduction to Programming",
    date: "2025-06-25",
    time: "14:00 - 16:00",
    status: "Pending",
    requestDate: "2025-06-16",
    studentCount: 30,
    purpose: "Programming tutorial session",
    equipment: ["Desktop Computers", "Projector"]
  },
  {
    id: 3,
    lab: "Chemistry Lab",
    course: "CHM202: Organic Chemistry",
    date: "2025-06-28",
    time: "09:00 - 11:00",
    status: "Approved",
    requestDate: "2025-06-14",
    studentCount: 20,
    purpose: "Experiment on organic compounds",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge"]
  },
  {
    id: 4,
    lab: "Computer Lab B",
    course: "CS404: Advanced Software Engineering",
    date: "2025-07-05",
    time: "13:00 - 15:00",
    status: "Rejected",
    requestDate: "2025-06-18",
    studentCount: 25,
    purpose: "Software architecture workshop",
    equipment: ["Desktop Computers", "Projector", "Whiteboard"],
    rejectionReason: "Lab is undergoing maintenance during the requested time slot."
  },
  {
    id: 5,
    lab: "Physics Lab",
    course: "PHY301: Advanced Physics",
    date: "2025-07-10",
    time: "09:00 - 11:00",
    status: "Approved",
    requestDate: "2025-06-20",
    studentCount: 25,
    purpose: "Electromagnetism experiment",
    equipment: ["Oscilloscope", "Multimeter", "Power Supply"]
  }
];

const MyReservations = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [showPast, setShowPast] = useState(false);
  const [modal, setModal] = useState(null);

  // Filter reservations based on search term, status, and date
  const filteredReservations = reservations.filter(reservation => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservationDate = new Date(reservation.date);
    const isPast = reservationDate < today;

    // Filter past reservations if showPast is false
    if (!showPast && isPast) return false;

    // Apply status filter
    if (statusFilter !== "all" && reservation.status.toLowerCase() !== statusFilter) return false;

    // Apply date filter
    if (dateFilter && reservation.date !== dateFilter) return false;

    // Apply search term filter
    const searchLower = searchTerm.toLowerCase();
    return (
      reservation.lab.toLowerCase().includes(searchLower) ||
      reservation.course.toLowerCase().includes(searchLower) ||
      reservation.purpose.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle reservation cancellation
  const handleCancelReservation = () => {
    if (!modal) return;
    
    setReservations(prev => 
      prev.map(r => 
        r.id === modal.id 
          ? { ...r, status: "Cancelled" } 
          : r
      )
    );
    
    setModal(null);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">My Reservations</h1>
      <p className="mb-6 text-gray-700">View and manage all your lab reservation requests.</p>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex flex-col xs:flex-row gap-3 md:gap-4">
            {/* Status Filter */}
            <div className="w-full xs:w-auto">
              <label htmlFor="statusFilter" className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full xs:w-auto focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Date Filter */}
            <div className="w-full xs:w-auto">
              <label htmlFor="dateFilter" className="block text-xs text-gray-500 mb-1">Date</label>
              <input
                type="date"
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full xs:w-auto focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
              />
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3 md:gap-4">
            {/* Show Past Checkbox */}
            <div className="flex items-center mt-auto">
              <input
                type="checkbox"
                id="showPast"
                checked={showPast}
                onChange={() => setShowPast(!showPast)}
                className="h-4 w-4 text-[#042E6F] focus:ring-[#042E6F] border-gray-300 rounded"
              />
              <label htmlFor="showPast" className="ml-2 block text-sm text-gray-700">
                Show past reservations
              </label>
            </div>
            
            {/* Search Box */}
            <div className="w-full xs:w-auto">
              <label htmlFor="search" className="block text-xs text-gray-500 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search labs, courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full xs:w-64 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="mb-6">
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#042E6F] text-center">
            <FaInfoCircle className="text-[#042E6F] text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reservations Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" || dateFilter
                ? "Try adjusting your filters or search criteria."
                : "You haven't made any lab reservations yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map(reservation => (
              <div key={reservation.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaFlask className="text-[#042E6F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#042E6F]">{reservation.lab}</h3>
                          <p className="text-sm text-gray-600">{reservation.course}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          {formatDate(reservation.date)}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-400" />
                          {reservation.time}
                        </div>
                        <div className="flex items-center">
                          <FaUsers className="mr-1 text-gray-400" />
                          {reservation.studentCount} students
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2 justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(reservation.status)}`}>
                        {reservation.status}
                      </span>
                      <button
                        onClick={() => setModal({ type: 'view', ...reservation })}
                        className="bg-[#042E6F] text-white px-3 py-1 rounded-full text-xs hover:bg-[#021E47] transition flex items-center justify-center"
                      >
                        <FaEye className="mr-1" /> View Details
                      </button>
                      {(reservation.status === "Pending" || reservation.status === "Approved") && new Date(reservation.date) > new Date() && (
                        <button
                          onClick={() => setModal({ type: 'cancel', id: reservation.id, lab: reservation.lab, date: reservation.date })}
                          className="bg-red-600 text-white px-3 py-1 rounded-full text-xs hover:bg-red-700 transition flex items-center justify-center"
                        >
                          <FaTrashAlt className="mr-1" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Purpose:</strong> {reservation.purpose}
                  </div>
                  
                  {reservation.equipment.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Equipment:</div>
                      <div className="flex flex-wrap gap-2">
                        {reservation.equipment.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {reservation.status === "Rejected" && reservation.rejectionReason && (
                    <div className="mt-3 bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="text-xs font-semibold text-red-700 mb-1">Rejection Reason:</div>
                      <div className="text-sm text-red-700">{reservation.rejectionReason}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {modal && modal.type === 'view' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Reservation Details</h3>
              <button
                onClick={() => setModal(null)}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-3">
                      <FaFlask className="text-[#042E6F] text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#042E6F] text-lg">{modal.lab}</h3>
                      <p className="text-gray-600">{modal.course}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-3 gap-y-2">
                      <div className="text-gray-500">Date:</div>
                      <div className="col-span-2 font-medium">{formatDate(modal.date)}</div>
                      
                      <div className="text-gray-500">Time:</div>
                      <div className="col-span-2 font-medium">{modal.time}</div>
                      
                      <div className="text-gray-500">Students:</div>
                      <div className="col-span-2 font-medium">{modal.studentCount}</div>
                      
                      <div className="text-gray-500">Status:</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(modal.status)}`}>
                          {modal.status}
                        </span>
                      </div>
                      
                      <div className="text-gray-500">Requested:</div>
                      <div className="col-span-2 font-medium">{formatDate(modal.requestDate)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#042E6F] mb-2">Purpose</h4>
                  <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">{modal.purpose}</p>
                  
                  {modal.equipment.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#042E6F] mb-2">Equipment</h4>
                      <div className="flex flex-wrap gap-2">
                        {modal.equipment.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {modal.status === "Rejected" && modal.rejectionReason && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-red-600 mb-2">Rejection Reason</h4>
                      <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500 text-red-700">
                        {modal.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                {(modal.status === "Pending" || modal.status === "Approved") && new Date(modal.date) > new Date() && (
                  <button
                    onClick={() => setModal({ type: 'cancel', id: modal.id, lab: modal.lab, date: modal.date })}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mr-3"
                  >
                    Cancel Reservation
                  </button>
                )}
                <button
                  onClick={() => setModal(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {modal && modal.type === 'cancel' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Cancel Reservation</h3>
              <button
                onClick={() => setModal(null)}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="mb-6">
                Are you sure you want to cancel your reservation for <strong>{modal.lab}</strong> on <strong>{formatDate(modal.date)}</strong>?
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
                <p className="text-yellow-700 text-sm">
                  <strong>Note:</strong> Once cancelled, you may not be able to re-book the same lab for this time slot if others reserve it.
                </p>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Reason for cancellation (optional)</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                  rows="3"
                  placeholder="Please provide a reason for cancellation"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Keep Reservation
                </button>
                <button
                  onClick={handleCancelReservation}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservations;
