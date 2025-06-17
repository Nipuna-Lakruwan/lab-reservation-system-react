/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
const users = [
  { name: "Alice", role: "Student", email: "alice@campus.edu", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Bob", role: "Lecturer", email: "bob@campus.edu", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Charlie", role: "Student", email: "charlie@campus.edu", image: "https://randomuser.me/api/portraits/men/45.jpg" }
];
const UserProfiles = () => (
  <div>
    <h1 className="text-2xl font-bold text-primary mb-4">User Profiles</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <div key={user.email} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary flex flex-col items-center hover:shadow-xl transition">
          <img src={user.image} alt={user.name} className="h-16 w-16 rounded-full border-4 border-primary shadow mb-2" />
          <div className="font-semibold text-primary">{user.name}</div>
          <div className="text-xs text-accent mb-2">{user.role}</div>
          <div className="text-sm text-gray-600 mb-2">{user.email}</div>
          <button className="bg-primary text-white px-4 py-1 rounded hover:bg-accent hover:text-primary transition font-semibold shadow text-sm">
            View / Edit
          </button>
        </div>
      ))}
    </div>
  </div>
);
export default UserProfiles;
