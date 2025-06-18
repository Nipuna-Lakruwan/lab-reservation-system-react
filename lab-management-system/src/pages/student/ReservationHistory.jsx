/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { FaSearch, FaFlask, FaCalendarAlt, FaClock, FaInfoCircle, FaEye } from "react-icons/fa";

// Sample history data 
const initialHistory = [
  {
    id: 1,
    lab: "Physics Lab",
    course: "PHY101: Introduction to Physics",
    date: "2025-05-15",
    time: "10:00 - 12:00",
    status: "Completed",
    purpose: "Conducting experiments on motion and forces",
    equipment: ["Oscilloscope", "Wave Generator", "Optical Bench"],
    feedback: "Excellent session, all equipment working well.",
    labAssistant: "Dr. Alan Johnson"
  },
  {
    id: 2,
    lab: "Computer Lab A",
    course: "CS101: Introduction to Programming",
    date: "2025-05-10",
    time: "14:00 - 16:00",
    status: "Completed",
    purpose: "Working on programming assignment",
    equipment: ["Desktop Computers", "Development Software"],
    feedback: "Some computers were slow, but overall good session.",
    labAssistant: "Ms. Jane Smith"
  },
  {
    id: 3,
    lab: "Chemistry Lab",
    course: "CHM202: Organic Chemistry",
    date: "2025-05-05",
    time: "09:00 - 11:00",
    status: "Cancelled",
    purpose: "Conducting experiments on organic compounds",
    equipment: ["Fume Hood", "Analytical Balance", "Centrifuge"],
    cancellationReason: "Scheduling conflict with another course"
  },
  {
    id: 4,
    lab: "Computer Lab B",
    course: "CS303: Database Systems",
    date: "2025-04-28",
    time: "13:00 - 15:00",
    status: "Missed",
    purpose: "Database project implementation",
    equipment: ["Desktop Computers", "Database Software"],
    comment: "Student did not attend the scheduled session"
  },
  {
    id: 5,
    lab: "Physics Lab",
    course: "PHY201: Electromagnetism",
    date: "2025-04-20",
    time: "10:00 - 12:00",
    status: "Completed",
    purpose: "Experiments on electromagnetic induction",
    equipment: ["Oscilloscope", "Multimeter", "Power Supply"],
    feedback: "Very informative session, learned a lot!",
    labAssistant: "Dr. Alan Johnson"
  }
];

const ReservationHistory = () => {
  const [history, setHistory] = useState(initialHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(null);

  // Filter history based on search term and status
  const filteredHistory = history.filter(item => {
    // Apply status filter
    if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) return false;

    // Apply search term filter
    const searchLower = searchTerm.toLowerCase();
    return (
      item.lab.toLowerCase().includes(searchLower) ||
      item.course.toLowerCase().includes(searchLower) ||
      item.purpose.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-yellow-100 text-yellow-800";
      case "Missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">Reservation History</h1>
      <p className="mb-6 text-gray-700">View your past lab sessions, including completed, cancelled, and missed bookings.</p>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-[#042E6F] mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <label htmlFor="statusFilter" className="block text-xs text-gray-500 mb-1">Filter by Status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="missed">Missed</option>
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-xs text-gray-500 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search labs, courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="mb-6">
        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#042E6F] text-center">
            <FaInfoCircle className="text-[#042E6F] text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No History Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters or search criteria."
                : "You don't have any past lab bookings yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaFlask className="text-[#042E6F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#042E6F]">{item.lab}</h3>
                          <p className="text-sm text-gray-600">{item.course}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          {formatDate(item.date)}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-400" />
                          {item.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                      <button
                        onClick={() => setModal(item)}
                        className="bg-[#042E6F] text-white px-3 py-1 rounded-lg text-xs hover:bg-[#021E47] transition flex items-center"
                      >
                        <FaEye className="mr-1" /> View Details
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Purpose:</strong> {item.purpose}
                  </div>

                  {/* Show different additional info based on status */}
                  {item.status === "Completed" && item.feedback && (
                    <div className="mt-3 bg-green-50 p-3 rounded-lg">
                      <div className="text-xs font-semibold text-green-700 mb-1">Feedback:</div>
                      <div className="text-sm text-green-700">{item.feedback}</div>
                    </div>
                  )}

                  {item.status === "Cancelled" && item.cancellationReason && (
                    <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                      <div className="text-xs font-semibold text-yellow-700 mb-1">Cancellation Reason:</div>
                      <div className="text-sm text-yellow-700">{item.cancellationReason}</div>
                    </div>
                  )}

                  {item.status === "Missed" && item.comment && (
                    <div className="mt-3 bg-red-50 p-3 rounded-lg">
                      <div className="text-xs font-semibold text-red-700 mb-1">Comment:</div>
                      <div className="text-sm text-red-700">{item.comment}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Session Details</h3>
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

                      <div className="text-gray-500">Status:</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(modal.status)}`}>
                          {modal.status}
                        </span>
                      </div>

                      {modal.labAssistant && (
                        <>
                          <div className="text-gray-500">Lab Assistant:</div>
                          <div className="col-span-2 font-medium">{modal.labAssistant}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#042E6F] mb-2">Purpose</h4>
                  <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">{modal.purpose}</p>

                  {modal.equipment.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#042E6F] mb-2">Equipment Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {modal.equipment.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Different sections based on status */}
                  {modal.status === "Completed" && modal.feedback && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-green-600 mb-2">Session Feedback</h4>
                      <div className="bg-green-50 p-3 rounded-lg text-green-700">
                        {modal.feedback}
                      </div>
                    </div>
                  )}

                  {modal.status === "Cancelled" && modal.cancellationReason && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-yellow-600 mb-2">Cancellation Reason</h4>
                      <div className="bg-yellow-50 p-3 rounded-lg text-yellow-700">
                        {modal.cancellationReason}
                      </div>
                    </div>
                  )}

                  {modal.status === "Missed" && modal.comment && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-red-600 mb-2">Missed Session Notes</h4>
                      <div className="bg-red-50 p-3 rounded-lg text-red-700">
                        {modal.comment}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
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
    </div>
  );
};

export default ReservationHistory;