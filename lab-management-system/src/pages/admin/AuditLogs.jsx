/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useEffect } from "react";
import {
  FaHistory, FaSearch, FaFilter, FaDownload, FaEye,
  FaChevronLeft, FaChevronRight, FaSort, FaSortUp, FaSortDown,
  FaInfoCircle, FaFileExport, FaCalendarAlt, FaUser, FaCog
} from "react-icons/fa";

// Generate demo audit logs
const generateAuditLogs = () => {
  const actionTypes = [
    "login", "logout", "reservation_created", "reservation_approved",
    "reservation_rejected", "user_created", "user_updated", "user_deleted",
    "lab_created", "lab_updated", "settings_changed", "password_reset"
  ];

  const users = [
    { name: "Admin User", role: "Administrator", id: "admin1" },
    { name: "Alice Smith", role: "Student", id: "student1" },
    { name: "Bob Johnson", role: "Lecturer", id: "lecturer1" },
    { name: "Charlie Davis", role: "Student", id: "student2" },
    { name: "Diana Edwards", role: "Lab Technician", id: "staff1" },
    { name: "System", role: "System", id: "system" }
  ];

  const getDetails = (actionType, user) => {
    switch (actionType) {
      case "login":
        return `${user.name} logged into the system`;
      case "logout":
        return `${user.name} logged out of the system`;
      case "reservation_created":
        return `New reservation request submitted for ${["Physics Lab", "Chemistry Lab", "Computer Lab A", "Computer Lab B", "Research Laboratory"][Math.floor(Math.random() * 5)]}`;
      case "reservation_approved":
        return `Reservation request approved for ${["Alice Smith", "Bob Johnson", "Charlie Davis"][Math.floor(Math.random() * 3)]}`;
      case "reservation_rejected":
        return `Reservation request rejected for ${["Alice Smith", "Bob Johnson", "Charlie Davis"][Math.floor(Math.random() * 3)]}`;
      case "user_created":
        return `New user account created: ${["John Williams", "Sarah Miller", "David Wilson"][Math.floor(Math.random() * 3)]}`;
      case "user_updated":
        return `User profile updated for ${user.name}`;
      case "user_deleted":
        return `User account deleted: ${["John Williams", "Sarah Miller", "David Wilson"][Math.floor(Math.random() * 3)]}`;
      case "lab_created":
        return `New lab created: ${["Physics Lab 2", "Chemistry Lab 3", "Computer Lab F"][Math.floor(Math.random() * 3)]}`;
      case "lab_updated":
        return `Lab information updated for ${["Physics Lab", "Chemistry Lab", "Computer Lab A"][Math.floor(Math.random() * 3)]}`;
      case "settings_changed":
        return `System settings updated by ${user.name}`;
      case "password_reset":
        return `Password reset initiated for ${["Alice Smith", "Bob Johnson", "Charlie Davis"][Math.floor(Math.random() * 3)]}`;
      default:
        return "Unknown action";
    }
  };

  const getSeverity = (actionType) => {
    if (["user_deleted", "settings_changed"].includes(actionType)) return "high";
    if (["user_created", "user_updated", "lab_created", "lab_updated", "reservation_approved", "reservation_rejected", "password_reset"].includes(actionType)) return "medium";
    return "low";
  };

  const getIpAddress = () => {
    return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const logs = [];
  const now = new Date();

  // Generate 100 random logs spanning the last 30 days
  for (let i = 1; i <= 100; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);

    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    const user = users[Math.floor(Math.random() * users.length)];
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];

    logs.push({
      id: i,
      timestamp,
      user,
      actionType,
      details: getDetails(actionType, user),
      ipAddress: getIpAddress(),
      severity: getSeverity(actionType),
      deviceInfo: Math.random() > 0.5 ? "Desktop - Chrome" : "Mobile - Safari"
    });
  }

  // Sort logs by timestamp (newest first)
  return logs.sort((a, b) => b.timestamp - a.timestamp);
};

const initialLogs = generateAuditLogs();

// Action type display mapping
const actionTypeLabels = {
  login: "Login",
  logout: "Logout",
  reservation_created: "Reservation Created",
  reservation_approved: "Reservation Approved",
  reservation_rejected: "Reservation Rejected",
  user_created: "User Created",
  user_updated: "User Updated",
  user_deleted: "User Deleted",
  lab_created: "Lab Created",
  lab_updated: "Lab Updated",
  settings_changed: "Settings Changed",
  password_reset: "Password Reset"
};

// Severity badge style mapping
const severityStyles = {
  low: "bg-blue-100 text-blue-800 border-blue-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  high: "bg-red-100 text-red-800 border-red-300"
};

// Extract unique users for filter dropdown
const uniqueUsers = Array.from(new Set(initialLogs.map(log => log.user.id)))
  .map(id => initialLogs.find(log => log.user.id === id).user);

// Extract unique action types for filter dropdown
const uniqueActionTypes = Array.from(new Set(initialLogs.map(log => log.actionType)));

const AuditLogs = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    actionType: "all",
    userId: "all",
    severity: "all",
    startDate: "",
    endDate: "",
    timeRange: "all"
  });
  const [sorting, setSorting] = useState({
    field: "timestamp",
    direction: "desc"
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 15,
    totalPages: Math.ceil(initialLogs.length / 15)
  });
  const [detailModal, setDetailModal] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and search
  useEffect(() => {
    setLoading(true);

    let results = [...logs];

    // Apply search term
    if (searchTerm) {
      results = results.filter(log =>
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply action type filter
    if (filters.actionType !== "all") {
      results = results.filter(log => log.actionType === filters.actionType);
    }

    // Apply user filter
    if (filters.userId !== "all") {
      results = results.filter(log => log.user.id === filters.userId);
    }

    // Apply severity filter
    if (filters.severity !== "all") {
      results = results.filter(log => log.severity === filters.severity);
    }

    // Apply date range filters
    if (filters.timeRange === "custom" && filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);

      results = results.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate && logDate <= endDate;
      });
    } else if (filters.timeRange === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      results = results.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= today;
      });
    } else if (filters.timeRange === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      results = results.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= yesterday && logDate < today;
      });
    } else if (filters.timeRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      results = results.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= weekAgo;
      });
    } else if (filters.timeRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      results = results.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= monthAgo;
      });
    }

    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;

      switch (sorting.field) {
        case "timestamp":
          comparison = new Date(a.timestamp) - new Date(b.timestamp);
          break;
        case "user":
          comparison = a.user.name.localeCompare(b.user.name);
          break;
        case "actionType":
          comparison = a.actionType.localeCompare(b.actionType);
          break;
        case "severity":
          const severityOrder = { high: 3, medium: 2, low: 1 };
          comparison = severityOrder[a.severity] - severityOrder[b.severity];
          break;
        default:
          comparison = new Date(a.timestamp) - new Date(b.timestamp);
      }

      return sorting.direction === "asc" ? comparison : -comparison;
    });

    setFilteredLogs(results);
    setPagination(prev => ({
      ...prev,
      totalPages: Math.ceil(results.length / prev.itemsPerPage),
      currentPage: 1
    }));

    setLoading(false);
  }, [logs, searchTerm, filters, sorting]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredLogs.slice(startIndex, endIndex);
  };

  // Handle page change
  const changePage = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

    // If changing time range to custom, expand the custom date inputs
    if (name === "timeRange" && value === "custom") {
      setShowFilters(true);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      actionType: "all",
      userId: "all",
      severity: "all",
      startDate: "",
      endDate: "",
      timeRange: "all"
    });
    setSearchTerm("");
  };

  // Handle sorting change
  const handleSortChange = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Get sort icon based on current sorting state
  const getSortIcon = (field) => {
    if (sorting.field !== field) return <FaSort className="text-gray-400" />;
    return sorting.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  // Format date for display
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format date for display (date only)
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Handle log export
  const handleExport = (format) => {
    // In a real system, this would generate and download a file
    alert(`Exporting audit logs in ${format.toUpperCase()} format`);
  };

  // Calculate pagination info
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(pagination.currentPage * pagination.itemsPerPage, filteredLogs.length);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-2">Audit Logs</h1>
      <p className="mb-6 text-gray-600">
        Track all system activities and changes for security and compliance purposes.
      </p>

      {/* Search and Quick Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </div>
            <button
              className="bg-[#042E6F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#021E47]"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#042E6F]"
              name="timeRange"
              value={filters.timeRange}
              onChange={handleFilterChange}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>

            <div className="dropdown relative">
              <button
                className="bg-[#042E6F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#021E47]"
                onClick={() => { }}
              >
                <FaFileExport /> Export
              </button>
              <div className="dropdown-menu absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 hidden">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport('csv')}
                >
                  Export as CSV
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport('pdf')}
                >
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaUser className="inline mr-1" /> User
                </label>
                <select
                  name="userId"
                  value={filters.userId}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                >
                  <option value="all">All Users</option>
                  {uniqueUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCog className="inline mr-1" /> Action Type
                </label>
                <select
                  name="actionType"
                  value={filters.actionType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                >
                  <option value="all">All Actions</option>
                  {uniqueActionTypes.map(type => (
                    <option key={type} value={type}>
                      {actionTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaInfoCircle className="inline mr-1" /> Severity
                </label>
                <select
                  name="severity"
                  value={filters.severity}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                >
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {filters.timeRange === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-1" /> Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#042E6F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-1" /> End Date
                  </label>
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

            <div className="flex justify-end">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-2"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#042E6F] flex items-center">
            <FaHistory className="mr-2" /> System Activity Log
          </h2>
          <div className="text-sm text-gray-600">
            Found <span className="font-semibold">{filteredLogs.length}</span> log entries
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-[#042E6F] border-t-transparent"></div>
            <span className="ml-3 text-gray-600">Loading audit logs...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-16">
            <FaHistory className="mx-auto text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Logs Found</h3>
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
                      onClick={() => handleSortChange("timestamp")}
                    >
                      <div className="flex items-center">
                        Date & Time
                        <span className="ml-1">{getSortIcon("timestamp")}</span>
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("actionType")}
                    >
                      <div className="flex items-center">
                        Action
                        <span className="ml-1">{getSortIcon("actionType")}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("severity")}
                    >
                      <div className="flex items-center">
                        Severity
                        <span className="ml-1">{getSortIcon("severity")}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageItems().map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatDate(log.timestamp)}</div>
                        <div className="text-xs text-gray-500">{formatTime(log.timestamp)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                        <div className="text-xs text-gray-500">{log.user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{actionTypeLabels[log.actionType]}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-[280px] truncate" title={log.details}>
                          {log.details}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${severityStyles[log.severity]}`}>
                          {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-[#042E6F] hover:text-[#021E47]"
                          onClick={() => setDetailModal(log)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
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
                    Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">
                      {endItem}
                    </span> of <span className="font-medium">{filteredLogs.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => changePage(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${pagination.currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                      let pageNum;

                      // Calculate which page numbers to show
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      if (pageNum > 0 && pageNum <= pagination.totalPages) {
                        return (
                          <button
                            key={i}
                            onClick={() => changePage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border ${pagination.currentPage === pageNum
                                ? "z-10 bg-[#042E6F] border-[#042E6F] text-white"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              } text-sm font-medium`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => changePage(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${pagination.currentPage === pagination.totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Log Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#042E6F] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Audit Log Details</h3>
              <button
                onClick={() => setDetailModal(null)}
                className="text-white hover:text-gray-200 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Event Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">Timestamp</div>
                      <div className="font-medium">{formatDateTime(detailModal.timestamp)}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">Action Type</div>
                      <div className="font-medium">{actionTypeLabels[detailModal.actionType]}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">Details</div>
                      <div className="font-medium">{detailModal.details}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Severity</div>
                      <div>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${severityStyles[detailModal.severity]}`}>
                          {detailModal.severity.charAt(0).toUpperCase() + detailModal.severity.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">User & System Info</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">User</div>
                      <div className="font-medium">{detailModal.user.name}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">Role</div>
                      <div className="font-medium">{detailModal.user.role}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500">IP Address</div>
                      <div className="font-medium">{detailModal.ipAddress}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Device / Browser</div>
                      <div className="font-medium">{detailModal.deviceInfo}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-end">
                <button
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  onClick={() => setDetailModal(null)}
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

export default AuditLogs;
