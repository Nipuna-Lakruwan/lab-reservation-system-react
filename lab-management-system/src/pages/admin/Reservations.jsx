/**
 * Copyright (c) 2024 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaSearch, FaFilter, FaEye, FaEdit, FaTimes, FaDownload, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// Simple date utility functions to replace date-fns
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const isToday = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isBefore = (dateStr, compareDate) => {
  const date1 = new Date(dateStr);
  const date2 = compareDate || new Date();
  return date1 < date2;
};

const isAfter = (dateStr, compareDate) => {
  const date1 = new Date(dateStr);
  const date2 = compareDate || new Date();
  return date1 > date2;
};

// Demo reservation data
const generateReservations = () => {
  const labs = ["Computer Lab A", "Computer Lab B", "Computer Lab C", "Computer Lab D", "Computer Lab E", "Research Laboratory"];
  const users = ["Alice", "Bob", "Charlie", "David", "Emily", "Frank"];
  const statuses = ["Upcoming", "In Progress", "Completed", "Cancelled"];
  
  const reservations = [];
  const today = new Date();
  
  // Generate 100 random reservations spanning past, present and future
  for (let i = 1; i <= 100; i++) {
    const daysOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days from today
    const date = new Date(today);
    date.setDate(today.getDate() + daysOffset);
    
    // Determine status based on date
    let status;
    if (isBefore(date, today) && !isToday(date)) {
      status = "Completed";
    } else if (isToday(date)) {
      status = "In Progress";
    } else {
      status = Math.random() < 0.1 ? "Cancelled" : "Upcoming"; // 10% chance of cancelled
    }
    
    // Random duration between 1-3 hours
    const durationHours = Math.floor(Math.random() * 3) + 1;
    const startHour = 8 + Math.floor(Math.random() * 8); // 8 AM to 4 PM
    const endHour = startHour + durationHours;
    
    reservations.push({
      id: i,
      lab: labs[Math.floor(Math.random() * labs.length)],
      user: users[Math.floor(Math.random() * users.length)],
      date: formatDate(date),
      time: `${startHour}:00 - ${endHour}:00`,
      duration: `${durationHours} hour${durationHours > 1 ? 's' : ''}`,
      purpose: `${Math.random() < 0.5 ? 'Research' : 'Class'} ${Math.random() < 0.5 ? 'session' : 'work'}`,
      status: status,
      createdAt: formatDate(new Date(today.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000))
    });
  }
  
  return reservations;
};

const initialReservations = generateReservations();

// Status badge color mapping
const statusColors = {
  "Upcoming": "bg-blue-100 text-blue-800 border-blue-300",
  "In Progress": "bg-green-100 text-green-800 border-green-300",
  "Completed": "bg-gray-100 text-gray-800 border-gray-300",
  "Cancelled": "bg-red-100 text-red-800 border-red-300"
};

const Reservations = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    lab: "all",
    dateRange: "all",
    startDate: "",
    endDate: ""
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: Math.ceil(initialReservations.length / 10)
  });
  const [sorting, setSorting] = useState({
    field: "date",
    direction: "desc"
  });
  const [detailModal, setDetailModal] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  // Filter reservations based on search and filters
  useEffect(() => {
    setLoading(true);
    let results = [...reservations];
    
    // Apply search
    if (searchTerm) {
      results = results.filter(reservation => 
        reservation.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.lab.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      results = results.filter(reservation => reservation.status === filters.status);
    }
    
    // Apply lab filter
    if (filters.lab !== "all") {
      results = results.filter(reservation => reservation.lab === filters.lab);
    }
    
    // Apply date range filter
    if (filters.dateRange === "custom" && filters.startDate && filters.endDate) {
      results = results.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59); // Include the entire end day
        
        return reservationDate >= startDate && reservationDate <= endDate;
      });
    } else if (filters.dateRange === "today") {
      const today = new Date();
      const todayStr = formatDate(today);
      results = results.filter(reservation => reservation.date === todayStr);
    } else if (filters.dateRange === "thisWeek") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Saturday
      
      results = results.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservationDate >= startOfWeek && reservationDate <= endOfWeek;
      });
    } else if (filters.dateRange === "thisMonth") {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      results = results.filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservationDate >= startOfMonth && reservationDate <= endOfMonth;
      });
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      
      switch(sorting.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "lab":
          comparison = a.lab.localeCompare(b.lab);
          break;
        case "user":
          comparison = a.user.localeCompare(b.user);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }
      
      return sorting.direction === "asc" ? comparison : -comparison;
    });
    
    // Update pagination
    setPagination(prev => ({
      ...prev,
      totalPages: Math.ceil(results.length / prev.itemsPerPage),
      currentPage: 1 // Reset to first page when filters change
    }));
    
    setFilteredReservations(results);
    setLoading(false);
  }, [reservations, searchTerm, filters, sorting]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredReservations.slice(startIndex, endIndex);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle sorting change
  const handleSortChange = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  // Handle reservation cancellation
  const handleCancelReservation = () => {
    setReservations(prev => 
      prev.map(res => 
        res.id === cancelModal.id 
          ? { ...res, status: "Cancelled" } 
          : res
      )
    );
    setCancelModal(null);
  };

  // Get unique labs for filter dropdown
  const uniqueLabs = [...new Set(reservations.map(res => res.lab))];

  // Get sort icon based on current sorting state
  const getSortIcon = (field) => {
    if (sorting.field !== field) return <FaSort />;
    return sorting.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-2">All Reservations</h1>
      <p className="mb-6 text-gray-600">View and manage all lab reservations in one place.</p>
      
      {/* Filters and Search Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#042E6F] flex items-center">
            <FaFilter className="mr-2" /> Filters & Search
          </h2>
          <div className="relative w-full lg:w-auto">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by user, lab, or purpose..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F] w-full lg:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
            >
              <option value="all">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lab</label>
            <select
              name="lab"
              value={filters.lab}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
            >
              <option value="all">All Labs</option>
              {uniqueLabs.map(lab => (
                <option key={lab} value={lab}>{lab}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {filters.dateRange === "custom" && (
            <div className="flex gap-2 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Found <span className="font-semibold">{filteredReservations.length}</span> reservations
          </div>
          <button 
            className="flex items-center gap-2 bg-[#042E6F] text-white px-4 py-2 rounded hover:bg-[#021E47] transition"
            onClick={() => {/* Export functionality */}}
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>
      
      {/* Reservations Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-[#042E6F] border-t-transparent"></div>
            <span className="ml-3 text-gray-600">Loading reservations...</span>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-16">
            <FaCalendarAlt className="mx-auto text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Reservations Found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("date")}
                    >
                      <div className="flex items-center">
                        Date
                        <span className="ml-1">{getSortIcon("date")}</span>
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("lab")}
                    >
                      <div className="flex items-center">
                        Lab
                        <span className="ml-1">{getSortIcon("lab")}</span>
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("user")}
                    >
                      <div className="flex items-center">
                        User
                        <span className="ml-1">{getSortIcon("user")}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("status")}
                    >
                      <div className="flex items-center">
                        Status
                        <span className="ml-1">{getSortIcon("status")}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageItems().map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatDate(reservation.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.lab}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reservation.time}</div>
                        <div className="text-xs text-gray-500">{reservation.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[reservation.status]}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-[#042E6F] hover:text-[#021E47] mr-3"
                          onClick={() => setDetailModal(reservation)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {reservation.status === "Upcoming" && (
                          <>
                            <button 
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => {/* Edit functionality */}}
                              title="Edit Reservation"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => setCancelModal(reservation)}
                              title="Cancel Reservation"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span> to <span className="font-medium">
                      {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredReservations.length)}
                    </span> of <span className="font-medium">{filteredReservations.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      &larr;
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(pagination.totalPages).keys()].map((x, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          pagination.currentPage === i + 1
                            ? "z-10 bg-[#042E6F] border-[#042E6F] text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        } text-sm font-medium`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.currentPage === pagination.totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      &rarr;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Reservation Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reservation Details</h3>
              <button 
                onClick={() => setDetailModal(null)}
                className="text-white hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{detailModal.lab}</h4>
                  <p className="text-gray-500">{formatDate(detailModal.date)} | {detailModal.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[detailModal.status]}`}>
                  {detailModal.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">Reservation Info</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="font-semibold">Duration:</span> {detailModal.duration}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Purpose:</span> {detailModal.purpose}
                    </div>
                    <div>
                      <span className="font-semibold">Created on:</span> {formatDate(detailModal.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-gray-500 uppercase mb-2">User Info</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="font-semibold">Name:</span> {detailModal.user}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Email:</span> {detailModal.user.toLowerCase().replace(' ', '')}@campus.edu
                    </div>
                    <div>
                      <span className="font-semibold">User Type:</span> {Math.random() > 0.5 ? 'Student' : 'Lecturer'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  onClick={() => setDetailModal(null)}
                >
                  Close
                </button>
                {detailModal.status === "Upcoming" && (
                  <>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => {
                        setDetailModal(null);
                        /* Open edit functionality */
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        setCancelModal(detailModal);
                        setDetailModal(null);
                      }}
                    >
                      Cancel Reservation
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cancel Reservation Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Reservation</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to cancel the reservation for <span className="font-semibold">{cancelModal.lab}</span> on <span className="font-semibold">{formatDate(cancelModal.date)}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                onClick={() => setCancelModal(null)}
              >
                No, Keep It
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleCancelReservation}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
