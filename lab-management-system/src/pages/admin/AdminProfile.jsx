/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
const AdminProfile = () => (
  <div>
    <h1 className="text-2xl font-bold text-primary mb-4">Admin Profile</h1>
    <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary max-w-lg">
      <div className="mb-4 flex flex-col items-center">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className="h-20 w-20 rounded-full border-4 border-primary shadow mb-2" />
        <button className="text-primary underline text-sm mt-1">Change Photo</button>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Name</label>
        <input className="border rounded px-4 py-2 w-full" defaultValue="Jane Doe" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Email</label>
        <input className="border rounded px-4 py-2 w-full" defaultValue="admin@campus.edu" />
      </div>
      <button className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-900 transition font-semibold shadow">
        Update Profile
      </button>
    </div>
  </div>
);
export default AdminProfile;
