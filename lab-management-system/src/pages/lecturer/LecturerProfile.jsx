/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaBookOpen, FaEdit, FaCheck, FaKey, FaCamera } from "react-icons/fa";

const LecturerProfile = () => {
  // Demo lecturer data
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@campus.edu",
    phone: "+94 76 123 4567",
    department: "Computer Science",
    specialization: "Software Engineering",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Dr. Sarah Johnson is an associate professor with over 10 years of teaching experience. She specializes in software engineering and database systems, with a focus on agile methodologies and educational technologies.",
    courses: ["CS101: Introduction to Programming", "CS404: Advanced Software Engineering", "CS305: Database Management Systems"]
  });
  
  const [editing, setEditing] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Handle edit mode toggle
  const handleEdit = (field, value) => {
    setEditing(field);
    setEditedValue(value);
  };

  // Handle field update
  const handleUpdate = () => {
    if (!editing) return;
    
    setSaving(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        [editing]: editedValue
      }));
      setEditing(null);
      setSaving(false);
    }, 800);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditing(null);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle password update
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    
    // Validate password
    const errors = {};
    if (!passwordForm.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setSaving(true);
    
    // Simulate API call to update password
    setTimeout(() => {
      setSaving(false);
      setChangePassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      alert("Password updated successfully!");
    }, 1000);
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfile(prev => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle bio editing
  const handleBioEdit = () => {
    handleEdit("bio", profile.bio);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">My Profile</h1>
      <p className="mb-6 text-gray-700">View and manage your account information</p>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        {/* Profile Header with Image */}
        <div className="relative bg-gradient-to-r from-[#042E6F] to-[#0960d0] h-32 md:h-48">
          <div className="absolute -bottom-16 left-8 rounded-xl bg-white p-2 shadow-lg">
            <div className="relative">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover" 
              />
              <label className="absolute bottom-0 right-0 bg-[#042E6F] text-white p-2 rounded-full cursor-pointer hover:bg-[#021E47] transition shadow">
                <FaCamera />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  aria-label="Change profile picture"
                />
              </label>
            </div>
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="pt-20 px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div>
              <h2 className="text-xl font-bold text-[#042E6F] mb-4">Personal Information</h2>
              
              {/* Name */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500 flex items-center">
                    <FaUser className="mr-2 text-[#042E6F]" /> Full Name
                  </label>
                  {editing !== "name" && (
                    <button 
                      onClick={() => handleEdit("name", profile.name)}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit name"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "name" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium text-lg">{profile.name}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500 flex items-center">
                    <FaEnvelope className="mr-2 text-[#042E6F]" /> Email
                  </label>
                  {editing !== "email" && (
                    <button 
                      onClick={() => handleEdit("email", profile.email)}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit email"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "email" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium">{profile.email}</p>
                )}
              </div>
              
              {/* Phone */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500 flex items-center">
                    <FaPhone className="mr-2 text-[#042E6F]" /> Phone
                  </label>
                  {editing !== "phone" && (
                    <button 
                      onClick={() => handleEdit("phone", profile.phone)}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit phone"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "phone" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium">{profile.phone}</p>
                )}
              </div>
              
              {/* Password Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#042E6F] mb-2">Security</h3>
                {!changePassword ? (
                  <button
                    onClick={() => setChangePassword(true)}
                    className="flex items-center text-[#042E6F] hover:text-[#021E47] font-medium"
                  >
                    <FaKey className="mr-2" /> Change Password
                  </button>
                ) : (
                  <form onSubmit={handleUpdatePassword} className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                      />
                      {passwordErrors.currentPassword && (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                      />
                      {passwordErrors.newPassword ? (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>
                      ) : (
                        <p className="text-gray-500 text-xs mt-1">Password must be at least 8 characters</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]`}
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setChangePassword(false)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#042E6F] text-white px-3 py-1 rounded-lg hover:bg-[#021E47] transition flex items-center"
                      >
                        {saving ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Updating...
                          </>
                        ) : (
                          <>Update Password</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            {/* Right Column - Professional Info */}
            <div>
              <h2 className="text-xl font-bold text-[#042E6F] mb-4">Professional Information</h2>
              
              {/* Department */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500 flex items-center">
                    <FaUniversity className="mr-2 text-[#042E6F]" /> Department
                  </label>
                  {editing !== "department" && (
                    <button 
                      onClick={() => handleEdit("department", profile.department)}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit department"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "department" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium">{profile.department}</p>
                )}
              </div>
              
              {/* Specialization */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500 flex items-center">
                    <FaBookOpen className="mr-2 text-[#042E6F]" /> Specialization
                  </label>
                  {editing !== "specialization" && (
                    <button 
                      onClick={() => handleEdit("specialization", profile.specialization)}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit specialization"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "specialization" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F]"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium">{profile.specialization}</p>
                )}
              </div>
              
              {/* Bio */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-gray-500">Bio</label>
                  {editing !== "bio" && (
                    <button 
                      onClick={handleBioEdit}
                      className="text-[#042E6F] hover:text-[#021E47] p-1"
                      aria-label="Edit bio"
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
                {editing === "bio" ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#042E6F] h-32"
                    />
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        aria-label="Save"
                      >
                        {saving ? (
                          <span className="animate-spin">⟳</span>
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{profile.bio}</p>
                )}
              </div>
              
              {/* Courses */}
              <div>
                <div className="mb-1">
                  <label className="text-sm text-gray-500">Current Courses</label>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  {profile.courses.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No courses assigned</p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {profile.courses.map((course, index) => (
                        <li key={index} className="text-gray-700 mb-1 text-sm">{course}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Courses are assigned by the system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerProfile;
