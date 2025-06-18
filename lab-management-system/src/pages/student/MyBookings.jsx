/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt, FaClock, FaFlask, FaMapMarkerAlt,
  FaInfoCircle, FaTimes, FaEye, FaTrashAlt, FaFilter,
  FaSearch, FaBook, FaUsers
} from "react-icons/fa";

// Sample bookings data
const initialBookings = [
  {
    id: 1,
    lab: "Physics Lab",
    labId: 1,
    course: "PHY101: Introduction to Physics",
    date: "2025-06-22",
    time: "10:00 - 12:00",
    status: "Approved",
    requestDate: "2025-06-15",
    groupSize: 4,
    purpose: "Conducting experiments on motion and forces",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench"],
    labAssistant: "Dr. Alan Johnson"
  },
  {
    id: 2,
    lab: "Computer Lab A",
    labId: 3,
    course: "CS101: Introduction to Programming",
    date: "2025-06-25",
    time: "14:00 - 16:00",
    status: "Pending",
    requestDate: "2025-06-17",
    groupSize: 3,
    purpose: "Working on programming assignment",
    equipment: ["Desktop Computers", "Development Software"],
    labAssistant: "Pending assignment"
  },
  {
    id: 3,
    lab: "Chemistry Lab",
    labId: 2,
    course: "CHM202: Organic Chemistry",
    date: "2025-06-28",
    time: "09:00 - 11:00",
    status: "Approved",
    requestDate: "2025-06-16",
    groupSize: 5,
    purpose: "Conducting experiments on organic compounds",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge"],
    labAssistant: "Dr. Emily Rodriguez"
  },
  {
    id: 4,
    lab: "Computer Lab B",
    labId: 4,
    course: "CS404: Advanced Software Engineering",
    date: "2025-07-05",
    time: "13:00 - 15:00",
    status: "Rejected",
    requestDate: "2025-06-18",
    groupSize: 2,
    purpose: "Working on final project",
    equipment: ["Desktop Computers", "Development Software"],
    labAssistant: "N/A",
    rejectionReason: "Lab is undergoing maintenance during the requested time slot."
  }
];

const MyBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [showPast, setShowPast] = useState(false);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  // Filter bookings based on search term, status, and date
  const filteredBookings = bookings.filter(booking => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(booking.date);
    const isPast = bookingDate < today;

    // Filter past bookings if showPast is false
    if (!showPast && isPast) return false;

    // Apply status filter
    if (statusFilter !== "all" && booking.status.toLowerCase() !== statusFilter.toLowerCase()) return false;

    // Apply date filter
    if (dateFilter && booking.date !== dateFilter) return false;

    // Apply search term filter
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.lab.toLowerCase().includes(searchLower) ||
      booking.course.toLowerCase().includes(searchLower) ||
      booking.purpose.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle booking cancellation
  const handleCancelBooking = () => {
    if (!modal) return;

    setBookings(prev =>
      prev.map(b =>
        b.id === modal.id
          ? { ...b, status: "Cancelled" }
          : b
      )
    );

    setModal(null);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">My Bookings</h1>
      <p className="mb-6 text-gray-700">View and manage all your lab bookings.</p>

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
                Show past bookings
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

      {/* Bookings List */}
      <div className="mb-6">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#042E6F] text-center">
            <FaInfoCircle className="text-[#042E6F] text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" || dateFilter
                ? "Try adjusting your filters or search criteria."
                : "You haven't made any lab bookings yet."}
            </p>
            <button
              onClick={() => navigate('/student/book-lab')}
              className="bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition"
            >
              Book a Lab
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaFlask className="text-[#042E6F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#042E6F]">{booking.lab}</h3>
                          <p className="text-sm text-gray-600">{booking.course}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-400" />
                          {booking.time}
                        </div>
                        <div className="flex items-center">
                          <FaUsers className="mr-1 text-gray-400" />
                          {booking.groupSize} students
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2 justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                      <button
                        onClick={() => setModal({ type: 'view', ...booking })}
                        className="bg-[#042E6F] text-white px-3 py-1 rounded-full text-xs hover:bg-[#021E47] transition flex items-center justify-center"
                      >
                        <FaEye className="mr-1" /> View Details
                      </button>
                      {(booking.status === "Pending" || booking.status === "Approved") && new Date(booking.date) > new Date() && (
                        <button
                          onClick={() => setModal({ type: 'cancel', id: booking.id, lab: booking.lab, date: booking.date })}
                          className="bg-red-600 text-white px-3 py-1 rounded-full text-xs hover:bg-red-700 transition flex items-center justify-center"
                        >
                          <FaTrashAlt className="mr-1" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Purpose:</strong> {booking.purpose}
                  </div>

                  {booking.equipment.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Equipment:</div>
                      <div className="flex flex-wrap gap-2">
                        {booking.equipment.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {booking.status === "Rejected" && booking.rejectionReason && (
                    <div className="mt-3 bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="text-xs font-semibold text-red-700 mb-1">Rejection Reason:</div>
                      <div className="text-sm text-red-700">{booking.rejectionReason}</div>
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
              <h3 className="text-xl font-semibold">Booking Details</h3>
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

                      <div className="text-gray-500">Group Size:</div>
                      <div className="col-span-2 font-medium">{modal.groupSize} students</div>

                      <div className="text-gray-500">Status:</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(modal.status)}`}>
                          {modal.status}
                        </span>
                      </div>

                      <div className="text-gray-500">Requested:</div>
                      <div className="col-span-2 font-medium">{formatDate(modal.requestDate)}</div>

                      <div className="text-gray-500">Lab Assistant:</div>
                      <div className="col-span-2 font-medium">{modal.labAssistant}</div>
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
                    Cancel Booking
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
              <h3 className="text-xl font-semibold">Cancel Booking</h3>
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
                Are you sure you want to cancel your booking for <strong>{modal.lab}</strong> on <strong>{formatDate(modal.date)}</strong>?
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
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
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

export default MyBookings;
