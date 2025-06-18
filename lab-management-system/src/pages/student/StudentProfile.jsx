/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import {
  FaUser, FaEnvelope, FaIdCard, FaGraduationCap,
  FaBuilding, FaPhone, FaEdit, FaKey, FaSave
} from "react-icons/fa";

const StudentProfile = () => {
  // Mock student data
  const [studentData, setStudentData] = useState({
    name: "John Smith",
    email: "john.smith@campus.edu",
    studentId: "CS2023001",
    department: "Computer Science",
    year: "3rd Year",
    contactNumber: "+94 76 123 4567",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...studentData });
  const [changePassword, setChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle password field changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Cancel edit - reset form data to original
      setFormData({ ...studentData });
      setErrors({});
    }
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  // Toggle change password form
  const toggleChangePassword = () => {
    setChangePassword(!changePassword);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setErrors({});
    setSuccessMessage("");
  };

  // Validate profile form
  const validateProfileForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile changes
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!validateProfileForm()) return;

    // In a real app, this would make an API call to update the profile
    setStudentData(formData);
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Change password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    // In a real app, this would make an API call to change the password
    // For demo purposes, we'll just show a success message
    setChangePassword(false);
    setSuccessMessage("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#042E6F] mb-2">My Profile</h1>
      <p className="mb-6 text-gray-700">View and manage your profile information.</p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#042E6F] h-fit">
          <div className="flex flex-col items-center">
            <img
              src={studentData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#042E6F33]"
            />
            <h2 className="mt-4 text-xl font-bold text-[#042E6F]">{studentData.name}</h2>
            <p className="text-gray-600">{studentData.studentId}</p>
            <p className="text-sm text-gray-500">{studentData.department} - {studentData.year}</p>

            {!isEditing && (
              <button
                onClick={toggleEditMode}
                className="mt-6 flex items-center bg-[#042E6F] text-white px-4 py-2 rounded-lg hover:bg-[#021E47] transition"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#042E6F] lg:col-span-2">
          <h2 className="text-xl font-bold text-[#042E6F] mb-6 flex items-center">
            <FaUser className="mr-2" /> Student Information
          </h2>

          {isEditing ? (
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Student ID - Read Only */}
                <div>
                  <label htmlFor="studentId" className="block text-gray-700 font-medium mb-1">Student ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="studentId"
                      value={formData.studentId}
                      readOnly
                      className="pl-10 w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Student ID cannot be changed</p>
                </div>

                {/* Department - Read Only */}
                <div>
                  <label htmlFor="department" className="block text-gray-700 font-medium mb-1">Department</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="department"
                      value={formData.department}
                      readOnly
                      className="pl-10 w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label htmlFor="year" className="block text-gray-700 font-medium mb-1">Year</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGraduationCap className="text-gray-400" />
                    </div>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-1">Contact Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={`pl-10 w-full p-2 border rounded-md ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.contactNumber && <p className="mt-1 text-red-500 text-sm">{errors.contactNumber}</p>}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium flex items-center">
                    <FaUser className="mr-2 text-[#042E6F]" /> {studentData.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium flex items-center">
                    <FaEnvelope className="mr-2 text-[#042E6F]" /> {studentData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Student ID</p>
                  <p className="font-medium flex items-center">
                    <FaIdCard className="mr-2 text-[#042E6F]" /> {studentData.studentId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Department</p>
                  <p className="font-medium flex items-center">
                    <FaBuilding className="mr-2 text-[#042E6F]" /> {studentData.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="font-medium flex items-center">
                    <FaGraduationCap className="mr-2 text-[#042E6F]" /> {studentData.year}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                  <p className="font-medium flex items-center">
                    <FaPhone className="mr-2 text-[#042E6F]" /> {studentData.contactNumber}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleChangePassword}
                  className="flex items-center border border-[#042E6F] text-[#042E6F] px-4 py-2 rounded-lg hover:bg-[#042E6F10] transition"
                >
                  <FaKey className="mr-2" /> Change Password
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Change Password Form (shown only when changePassword is true) */}
      {changePassword && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#042E6F]">
          <h2 className="text-xl font-bold text-[#042E6F] mb-6 flex items-center">
            <FaKey className="mr-2" /> Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 border rounded-md ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.currentPassword && <p className="mt-1 text-red-500 text-sm">{errors.currentPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 border rounded-md ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword}</p>}
                <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={toggleChangePassword}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;