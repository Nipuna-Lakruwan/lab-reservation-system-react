/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";

// Demo user data
const initialUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@campus.edu",
    role: "Student",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@campus.edu",
    role: "Lecturer",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@campus.edu",
    role: "Student",
    status: "Inactive",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const roles = ["Student", "Lecturer", "Admin"];
const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};
const roleColors = {
  Student: "bg-blue-100 text-blue-700",
  Lecturer: "bg-yellow-100 text-yellow-800",
  Admin: "bg-purple-100 text-purple-700",
};

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [modal, setModal] = useState(null); // {type: 'add'|'edit'|'delete'|'reset', user: {...}}
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Student",
    image: "",
    status: "Active",
  });
  const [search, setSearch] = useState("");

  // New state for tab management and pending users
  const [activeTab, setActiveTab] = useState("users");
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 101,
      name: "John Smith",
      email: "john.smith@campus.edu",
      role: "Student",
      department: "Computer Science",
      studentId: "CS2023001",
      requestDate: "2025-06-15",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 102,
      name: "Emily Johnson",
      email: "emily.johnson@campus.edu",
      role: "Lecturer",
      department: "Physics",
      requestDate: "2025-06-14",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
    },
  ]);

  // Handlers
  const openAddModal = () => {
    setForm({ name: "", email: "", role: "Student", image: "", status: "Active" });
    setModal({ type: "add" });
  };

  const openEditModal = (user) => {
    setForm({ ...user });
    setModal({ type: "edit", user });
  };

  const openDeleteModal = (user) => {
    setModal({ type: "delete", user });
  };

  const openResetModal = (user) => {
    setModal({ type: "reset", user });
  };

  const closeModal = () => setModal(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers((prev) => [
      ...prev,
      {
        ...form,
        id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1,
        image: form.image || "https://randomuser.me/api/portraits/lego/1.jpg",
      },
    ]);
    closeModal();
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((u) =>
        u.id === modal.user.id ? { ...u, ...form, image: form.image || u.image } : u
      )
    );
    closeModal();
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== modal.user.id));
    closeModal();
  };

  const handleResetPassword = () => {
    // In a real system, trigger password reset email or set a new password
    alert(`Password reset link sent to ${modal.user.email}`);
    closeModal();
  };

  const handleToggleStatus = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  // New handler for approving users
  const handleApproveUser = (userId) => {
    // In a real application, this would call an API to approve the user
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    // Add the approved user to the regular users list
    const approvedUser = pendingUsers.find((user) => user.id === userId);
    if (approvedUser) {
      setUsers((prev) => [
        ...prev,
        {
          ...approvedUser,
          status: "Active",
        },
      ]);
    }
  };

  // New handler for rejecting users
  const handleRejectUser = (userId) => {
    // In a real application, this would call an API to reject the user
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-4">User Management</h1>
      <p className="mb-6 text-gray-600">Manage user access, roles, and permissions here.</p>

      {/* Add tabs for switching between users and approval requests */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "users"
              ? "text-[#042E6F] border-b-2 border-[#042E6F]"
              : "text-gray-500 hover:text-[#042E6F]"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "approvals"
              ? "text-[#042E6F] border-b-2 border-[#042E6F]"
              : "text-gray-500 hover:text-[#042E6F]"
          }`}
          onClick={() => setActiveTab("approvals")}
        >
          Approval Requests
          {pendingUsers.length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {pendingUsers.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "users" ? (
        // Existing user management content
        <div className="bg-white rounded-lg shadow p-4 sm:p-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
            <span className="font-semibold text-[#042E6F]">All Users</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-[#042E6F] w-full sm:w-auto"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search users"
              />
              <button
                className="button bg-[#042E6F] text-white px-4 py-2 rounded hover:bg-[#06419d] transition font-semibold shadow"
                onClick={openAddModal}
              >
                + Add New User
              </button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle sm:px-0 px-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Photo</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Name</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Email</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Role</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Status</th>
                    <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-400 italic">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, idx) => (
                      <tr key={user.id} className={idx % 2 === 0 ? "bg-[#f2f6ff]" : "bg-white"}>
                        <td className="py-2 px-3">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-[#042E6F]"
                          />
                        </td>
                        <td className="py-2 px-3 font-semibold text-[#042E6F] text-sm sm:text-base">{user.name}</td>
                        <td className="py-2 px-3 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{user.email}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${roleColors[user.role]}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <button
                            className={`px-2 py-1 rounded text-xs font-semibold focus:outline-none ${statusColors[user.status]}`}
                            onClick={() => handleToggleStatus(user)}
                            title="Toggle status"
                            aria-label={`Set status to ${user.status === "Active" ? "Inactive" : "Active"}`}
                          >
                            {user.status}
                          </button>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            <button
                              className="bg-yellow-400 text-[#042E6F] px-2 sm:px-3 py-1 rounded text-xs hover:bg-yellow-300 transition font-semibold"
                              onClick={() => openEditModal(user)}
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs hover:bg-red-400 transition font-semibold"
                              onClick={() => openDeleteModal(user)}
                              title="Delete"
                            >
                              Delete
                            </button>
                            <button
                              className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs hover:bg-blue-700 transition font-semibold"
                              onClick={() => openResetModal(user)}
                              title="Reset Password"
                            >
                              Reset
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // New approval requests content
        <div className="bg-white rounded-lg shadow p-4 sm:p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-[#042E6F]">Account Approval Requests</h2>
            <span className="text-sm text-gray-500">
              {pendingUsers.length} pending {pendingUsers.length === 1 ? "request" : "requests"}
            </span>
          </div>

          {pendingUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400 italic">
              No pending approval requests.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle sm:px-0 px-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">User</th>
                      <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Role</th>
                      <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Department</th>
                      <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Requested</th>
                      <th className="py-3 px-4 bg-[#042E6F] text-white text-left text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingUsers.map((user, idx) => (
                      <tr key={user.id} className={idx % 2 === 0 ? "bg-[#f2f6ff]" : "bg-white"}>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-10 w-10 rounded-full border-2 border-[#042E6F] mr-3"
                            />
                            <div>
                              <div className="font-semibold text-[#042E6F]">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.role === "Student" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">{user.department}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{user.requestDate}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveUser(user.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectUser(user.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition font-semibold"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => alert(`View details for ${user.name}`)}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300 transition font-semibold"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (modal.type === "add" || modal.type === "edit") && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-gray-100 rounded-xl shadow-lg p-8 w-full max-w-md border-t-4 border-primary relative"
            onSubmit={modal.type === "add" ? handleAddUser : handleEditUser}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl"
              onClick={closeModal}
              type="button"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-primary mb-4">
              {modal.type === "add" ? "Add New User" : "Edit User"}
            </h3>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="border rounded px-4 py-2 w-full"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Email</label>
              <input
                className="border rounded px-4 py-2 w-full"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                required
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Role</label>
              <select
                className="border rounded px-4 py-2 w-full"
                name="role"
                value={form.role}
                onChange={handleFormChange}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Status</label>
              <select
                className="border rounded px-4 py-2 w-full"
                name="status"
                value={form.status}
                onChange={handleFormChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1">Photo URL</label>
              <input
                className="border rounded px-4 py-2 w-full"
                name="image"
                value={form.image}
                onChange={handleFormChange}
                placeholder="https://..."
              />
            </div>
            <button
              className="bg-primary text-white px-6 py-2 rounded hover:bg-accent hover:text-primary transition font-semibold shadow w-full"
              type="submit"
            >
              {modal.type === "add" ? "Add User" : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {modal && modal.type === "delete" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-xl shadow-lg p-8 w-full max-w-md border-t-4 border-primary relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-primary mb-4">Delete User</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{modal.user.name}</span>?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-400 transition font-semibold shadow w-full"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-primary px-6 py-2 rounded hover:bg-gray-400 transition font-semibold shadow w-full"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {modal && modal.type === "reset" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-xl shadow-lg p-8 w-full max-w-md border-t-4 border-primary relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-primary text-2xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-primary mb-4">Reset Password</h3>
            <p className="mb-6">
              Send a password reset link to{" "}
              <span className="font-semibold">{modal.user.email}</span>?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold shadow w-full"
                onClick={handleResetPassword}
              >
                Send Link
              </button>
              <button
                className="bg-gray-300 text-primary px-6 py-2 rounded hover:bg-gray-400 transition font-semibold shadow w-full"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;