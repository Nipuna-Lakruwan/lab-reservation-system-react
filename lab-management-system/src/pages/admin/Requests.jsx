/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import {
  FaCheck, FaTimes, FaSyncAlt, FaFilter, FaTasks,
  FaClipboardList, FaChevronLeft, FaChevronRight
} from "react-icons/fa";

// Demo requests data
const initialRequests = [
  {
    id: 1,
    requester: "Alice Smith",
    role: "Student",
    lab: "Physics Lab",
    date: "2025-06-20",
    time: "09:00 - 11:00",
    purpose: "Lab practical for PHY101",
    status: "Pending",
    requestedOn: "2025-06-15"
  },
  {
    id: 2,
    requester: "Bob Johnson",
    role: "Lecturer",
    lab: "Chemistry Lab",
    date: "2025-06-21",
    time: "13:00 - 15:00",
    purpose: "Special session for CHM202",
    status: "Pending",
    requestedOn: "2025-06-16"
  },
  {
    id: 3,
    requester: "Charlie Davis",
    role: "Student",
    lab: "Computer Lab A",
    date: "2025-06-22",
    time: "10:00 - 12:00",
    purpose: "Assignment work for CS303",
    status: "Pending",
    requestedOn: "2025-06-17"
  },
  {
    id: 4,
    requester: "Diana Edwards",
    role: "Student",
    lab: "Computer Lab B",
    date: "2025-06-23",
    time: "14:00 - 16:00",
    purpose: "Group project for CS404",
    status: "Pending",
    requestedOn: "2025-06-17"
  },
  {
    id: 5,
    requester: "Emma Wilson",
    role: "Lecturer",
    lab: "Physics Lab",
    date: "2025-06-24",
    time: "09:00 - 12:00",
    purpose: "Demonstration for PHY201",
    status: "Pending",
    requestedOn: "2025-06-18"
  },
  {
    id: 6,
    requester: "Frank Miller",
    role: "Student",
    lab: "Research Laboratory",
    date: "2025-06-25",
    time: "13:00 - 17:00",
    purpose: "Final year project experiments",
    status: "Pending",
    requestedOn: "2025-06-18"
  },
  {
    id: 7,
    requester: "Grace Lee",
    role: "Student",
    lab: "Computer Lab C",
    date: "2025-06-26",
    time: "10:00 - 12:00",
    purpose: "Software testing for CS405",
    status: "Pending",
    requestedOn: "2025-06-19"
  },
  {
    id: 8,
    requester: "Henry Brown",
    role: "Lecturer",
    lab: "Chemistry Lab",
    date: "2025-06-27",
    time: "14:00 - 16:00",
    purpose: "Research with graduate students",
    status: "Pending",
    requestedOn: "2025-06-19"
  },
  {
    id: 9,
    requester: "Ivy Martinez",
    role: "Student",
    lab: "Computer Lab D",
    date: "2025-06-28",
    time: "09:00 - 11:00",
    purpose: "Programming competition practice",
    status: "Pending",
    requestedOn: "2025-06-20"
  },
  {
    id: 10,
    requester: "Jack Thompson",
    role: "Student",
    lab: "Physics Lab",
    date: "2025-06-29",
    time: "13:00 - 15:00",
    purpose: "Lab report completion",
    status: "Pending",
    requestedOn: "2025-06-20"
  },
  {
    id: 11,
    requester: "Karen Harris",
    role: "Lecturer",
    lab: "Research Laboratory",
    date: "2025-06-30",
    time: "10:00 - 14:00",
    purpose: "Faculty research project",
    status: "Pending",
    requestedOn: "2025-06-21"
  },
  {
    id: 12,
    requester: "Leo Garcia",
    role: "Student",
    lab: "Computer Lab A",
    date: "2025-07-01",
    time: "14:00 - 16:00",
    purpose: "Advanced programming workshop",
    status: "Pending",
    requestedOn: "2025-06-21"
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

// Extract unique labs for filter dropdown
const uniqueLabs = [...new Set(initialRequests.map(req => req.lab))];

const Requests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(null); // {type: 'approve'|'reject'|'bulk-approve'|'bulk-reject', request: {...}}

  // Filter states
  const [filters, setFilters] = useState({
    userType: "all",
    lab: "all",
    dateFrom: "",
    dateTo: ""
  });

  // Pagination states
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: Math.ceil(initialRequests.length / 5)
  });

  // Effect to apply filters
  useEffect(() => {
    let filtered = [...requests];

    // Apply user type filter
    if (filters.userType !== "all") {
      filtered = filtered.filter(req =>
        req.role.toLowerCase() === filters.userType.toLowerCase()
      );
    }

    // Apply lab filter
    if (filters.lab !== "all") {
      filtered = filtered.filter(req => req.lab === filters.lab);
    }

    // Apply date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(req =>
        new Date(req.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(req =>
        new Date(req.date) <= new Date(filters.dateTo)
      );
    }

    setFilteredRequests(filtered);
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage)
    }));

    // Reset selections when filters change
    setSelectedItems([]);
    setSelectAll(false);
  }, [requests, filters]);

  // Handle individual item selection
  const handleItemSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const currentPageItems = getCurrentPageItems();
      setSelectedItems(currentPageItems.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Get items for the current page
  const getCurrentPageItems = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredRequests.slice(startIndex, endIndex);
  };

  // Update current page
  const changePage = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
    // Reset selections when page changes
    setSelectedItems([]);
    setSelectAll(false);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      userType: "all",
      lab: "all",
      dateFrom: "",
      dateTo: ""
    });
  };

  // Handle individual approval/rejection
  const handleAction = (type, request) => {
    setModal({ type, request });
  };

  // Handle bulk action
  const handleBulkAction = (type) => {
    if (selectedItems.length === 0) return;

    setModal({
      type: `bulk-${type}`,
      count: selectedItems.length
    });
  };

  // Close modal
  const closeModal = () => setModal(null);

  // Confirm individual action
  const handleConfirmAction = () => {
    if (!modal || !modal.request) return;

    setRequests(prev =>
      prev.map(r =>
        r.id === modal.request.id
          ? { ...r, status: modal.type === "approve" ? "Approved" : "Rejected" }
          : r
      )
    );
    closeModal();
  };

  // Confirm bulk action
  const handleConfirmBulkAction = () => {
    if (!modal) return;

    const actionType = modal.type === "bulk-approve" ? "Approved" : "Rejected";

    setRequests(prev =>
      prev.map(r =>
        selectedItems.includes(r.id)
          ? { ...r, status: actionType }
          : r
      )
    );

    setSelectedItems([]);
    setSelectAll(false);
    closeModal();
  };

  // Refresh requests
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRequests(initialRequests);
      setLoading(false);
      setSelectedItems([]);
      setSelectAll(false);
    }, 1000);
  };

  // Calculate pagination info
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(startItem + pagination.itemsPerPage - 1, filteredRequests.length);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-4">
        Reservation Requests
      </h1>
      <p className="mb-6 text-gray-600">
        Manage and process lab reservation requests efficiently.
      </p>

      {/* Filter Controls Section */}
      <section className="filter-controls mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-[#042E6F] mb-4 flex items-center">
            <FaFilter className="mr-2" /> Filter Requests
          </h2>
          <div className="filter-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="form-group">
                <label htmlFor="userType" className="block mb-1 font-medium text-gray-700">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  value={filters.userType}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                >
                  <option value="all">All Users</option>
                  <option value="student">Students</option>
                  <option value="lecturer">Lecturers</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="lab" className="block mb-1 font-medium text-gray-700">Lab</label>
                <select
                  id="lab"
                  name="lab"
                  value={filters.lab}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                >
                  <option value="all">All Labs</option>
                  {uniqueLabs.map(lab => (
                    <option key={lab} value={lab}>{lab}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dateFrom" className="block mb-1 font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateTo" className="block mb-1 font-medium text-gray-700">To Date</label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition font-medium"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="bg-[#042E6F] text-white px-4 py-2 rounded hover:bg-[#06419d] transition font-medium"
                onClick={() => {/* Apply filters is automatic */ }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Actions Section */}
      <section className="bulk-actions mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg font-semibold text-[#042E6F] flex items-center">
              <FaTasks className="mr-2" /> Bulk Actions
            </h2>
            <div className="bulk-action-controls flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">
                <strong>{selectedItems.length}</strong> items selected
              </span>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition"
                onClick={handleSelectAll}
              >
                {selectAll ? "Deselect All" : "Select All"}
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleBulkAction("approve")}
                disabled={selectedItems.length === 0}
              >
                Approve Selected
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleBulkAction("reject")}
                disabled={selectedItems.length === 0}
              >
                Reject Selected
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Requests Table Section - Improved for mobile */}
      <section className="requests-section mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
          <div className="section-header flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-[#042E6F] flex items-center">
              <FaClipboardList className="mr-2" /> Pending Lab Reservation Requests
            </h2>
            <button
              className="flex items-center justify-center bg-gray-200 text-[#042E6F] px-4 py-2 rounded hover:bg-gray-300 transition font-medium"
              onClick={handleRefresh}
              disabled={loading}
            >
              <FaSyncAlt className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Responsive table wrapper */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full sm:px-0 px-4">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 accent-white"
                      />
                    </th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Requester</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Role</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Lab Name</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Date</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Time</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Requested On</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Purpose</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-8 text-gray-400 italic"
                      >
                        <div className="loading-spinner inline-block mr-2 border-4 border-[#042E6F33] border-t-[#042E6F] rounded-full w-6 h-6 animate-spin"></div>
                        Loading requests...
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-8 text-gray-400 italic"
                      >
                        No pending requests match your filters.
                      </td>
                    </tr>
                  ) : (
                    getCurrentPageItems().map((req, idx) => (
                      <tr
                        key={req.id}
                        className={idx % 2 === 0 ? "bg-[#f8faff]" : "bg-white"}
                      >
                        <td className="py-3 px-4 border-b border-gray-100">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(req.id)}
                            onChange={() => handleItemSelect(req.id)}
                            className="w-4 h-4 accent-[#042E6F]"
                          />
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100 font-medium">{req.requester}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{req.role}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{req.lab}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{req.date}</td>
                        <td className="py-3 px-4 border-b border-gray-100">{req.time}</td>
                        <td className="py-3 px-4 border-b border-gray-100 text-sm text-gray-600">{req.requestedOn}</td>
                        <td className="py-3 px-4 border-b border-gray-100 max-w-[200px] truncate" title={req.purpose}>
                          {req.purpose}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100 flex gap-1">
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700 transition"
                            onClick={() => handleAction("approve", req)}
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition"
                            onClick={() => handleAction("reject", req)}
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls - Better mobile layout */}
          {filteredRequests.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4 mt-4">
              <div className="text-sm text-gray-600 mb-3 sm:mb-0 text-center sm:text-left">
                Showing <span className="font-semibold">{startItem}</span>-<span className="font-semibold">{endItem}</span> of <span className="font-semibold">{filteredRequests.length}</span> requests
              </div>
              <div className="flex items-center">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${pagination.currentPage > 1
                      ? "text-[#042E6F] hover:bg-[#042E6F10]"
                      : "text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() => pagination.currentPage > 1 && changePage(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                >
                  <FaChevronLeft className="text-xs" /> Previous
                </button>
                <div className="flex mx-2">
                  {pagination.totalPages <= 5 ? (
                    // Show all pages if 5 or fewer
                    [...Array(pagination.totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 ${pagination.currentPage === idx + 1
                            ? "bg-[#042E6F] text-white"
                            : "text-[#042E6F] hover:bg-[#042E6F10]"
                          }`}
                        onClick={() => changePage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))
                  ) : (
                    // Show limited pages for better mobile display
                    <>
                      {/* First page */}
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 ${pagination.currentPage === 1
                            ? "bg-[#042E6F] text-white"
                            : "text-[#042E6F] hover:bg-[#042E6F10]"
                          }`}
                        onClick={() => changePage(1)}
                      >
                        1
                      </button>

                      {/* Ellipsis or second page */}
                      {pagination.currentPage > 3 && (
                        <span className="w-8 h-8 flex items-center justify-center">...</span>
                      )}

                      {/* Pages around current page */}
                      {[...Array(pagination.totalPages)].slice(
                        Math.max(1, pagination.currentPage - 1) - 1,
                        Math.min(pagination.totalPages - 1, pagination.currentPage + 1)
                      ).map((_, idx) => {
                        const pageNum = Math.max(2, pagination.currentPage - 1) + idx;
                        return (
                          <button
                            key={pageNum}
                            className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 ${pagination.currentPage === pageNum
                                ? "bg-[#042E6F] text-white"
                                : "text-[#042E6F] hover:bg-[#042E6F10]"
                              }`}
                            onClick={() => changePage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {/* Ellipsis or second-to-last page */}
                      {pagination.currentPage < pagination.totalPages - 2 && (
                        <span className="w-8 h-8 flex items-center justify-center">...</span>
                      )}

                      {/* Last page */}
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 ${pagination.currentPage === pagination.totalPages
                            ? "bg-[#042E6F] text-white"
                            : "text-[#042E6F] hover:bg-[#042E6F10]"
                          }`}
                        onClick={() => changePage(pagination.totalPages)}
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}
                </div>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${pagination.currentPage < pagination.totalPages
                      ? "text-[#042E6F] hover:bg-[#042E6F10]"
                      : "text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() =>
                    pagination.currentPage < pagination.totalPages &&
                    changePage(pagination.currentPage + 1)
                  }
                  disabled={pagination.currentPage >= pagination.totalPages}
                >
                  Next <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Individual Approval/Rejection Modal */}
      {modal && (modal.type === "approve" || modal.type === "reject") && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-0 w-full max-w-md overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {modal.type === "approve" ? "Approve Request" : "Reject Request"}
              </h3>
              <button
                className="text-white text-2xl hover:text-gray-200"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-2 text-sm sm:text-base">
                  <div className="font-semibold">Requester:</div>
                  <div className="col-span-2 break-words">{modal.request.requester}</div>

                  <div className="font-semibold">Role:</div>
                  <div className="col-span-2">{modal.request.role}</div>

                  <div className="font-semibold">Lab:</div>
                  <div className="col-span-2">{modal.request.lab}</div>

                  <div className="font-semibold">Date:</div>
                  <div className="col-span-2">{modal.request.date}</div>

                  <div className="font-semibold">Time:</div>
                  <div className="col-span-2">{modal.request.time}</div>

                  <div className="font-semibold">Purpose:</div>
                  <div className="col-span-2">{modal.request.purpose}</div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2">
                  Notes (optional)
                </label>
                <textarea
                  className="border border-gray-300 rounded px-4 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                  placeholder="Add any notes for this action"
                ></textarea>
              </div>
              <div className="flex gap-4 justify-end">
                {modal.type === "reject" ? (
                  <>
                    <button
                      className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition font-medium"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
                      onClick={handleConfirmAction}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition font-medium"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium"
                      onClick={handleConfirmAction}
                    >
                      Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Modal */}
      {modal && (modal.type === "bulk-approve" || modal.type === "bulk-reject") && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-0 w-full max-w-md overflow-hidden">
            <div className={`${modal.type === "bulk-approve" ? "bg-green-600" : "bg-red-600"} text-white px-6 py-4 flex justify-between items-center`}>
              <h3 className="text-xl font-semibold">
                {modal.type === "bulk-approve" ? "Bulk Approval" : "Bulk Rejection"}
              </h3>
              <button
                className="text-white text-2xl hover:text-gray-200"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="mb-6 font-medium">
                You are about to {modal.type === "bulk-approve" ? "approve" : "reject"}{" "}
                <span className="font-bold">{modal.count}</span> request{modal.count !== 1 ? "s" : ""}.
                This action cannot be undone.
              </p>
              <div className="mb-6">
                <label className="block font-semibold mb-2">
                  Notes (optional)
                </label>
                <textarea
                  className="border border-gray-300 rounded px-4 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                  placeholder="Add any notes for these actions"
                ></textarea>
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition font-medium"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 ${modal.type === "bulk-approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                    } text-white rounded transition font-medium`}
                  onClick={handleConfirmBulkAction}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;