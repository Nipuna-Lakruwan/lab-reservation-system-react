/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState, useRef, useEffect } from "react";
import { 
  FaCog, FaCalendarAlt, FaBell, FaUser, FaShieldAlt, FaInfoCircle, 
  FaUpload, FaTrashAlt, FaQuestionCircle, FaSync, FaSave, 
  FaCheck, FaExclamationTriangle, FaTimes
} from "react-icons/fa";

const Settings = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState("general");
  
  // Form states for each settings section
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "Lab Reservation System",
    institutionName: "BCI Higher Education Institution",
    timezone: "UTC+05:30",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12",
    academicYearStart: "9"
  });
  
  const [reservationSettings, setReservationSettings] = useState({
    requireApprovalStudents: true,
    requireApprovalLecturers: false,
    maxReservationDaysAhead: 30,
    maxReservationDuration: 4,
    maxWeeklyReservations: 5,
    allowCancellationAfterStart: false,
    cancellationTimeLimit: 24
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: true,
    reservationReminders: true,
    reminderTime: 2,
    systemEmail: "no-reply@labreservation.edu"
  });
  
  const [profileSettings, setProfileSettings] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567890",
    department: "IT Department",
    title: "Department Coordinator",
    profileImage: "/assets/img/default-user.png"
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: false,
    sessionTimeout: 30
  });
  
  // File input ref for profile image upload
  const fileInputRef = useRef(null);
  
  // Loading and success states for form submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: "Password strength"
  });
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle form input changes
  const handleGeneralChange = (e) => {
    const { id, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [id.replace('general-', '')]: value
    }));
  };
  
  const handleReservationChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace('reservation-', '');
    setReservationSettings(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace('notification-', '');
    setNotificationSettings(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileSettings(prev => ({
      ...prev,
      [id.replace('profile-', '')]: value
    }));
  };
  
  const handleSecurityChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace('security-', '');
    
    setSecuritySettings(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? checked : value
    }));
    
    // Calculate password strength if password field changes
    if (id === 'security-newPassword') {
      calculatePasswordStrength(value);
    }
  };
  
  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileSettings(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile image removal
  const handleRemoveImage = () => {
    setProfileSettings(prev => ({
      ...prev,
      profileImage: "/assets/img/default-user.png"
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    // Simple password strength calculation logic
    let score = 0;
    let text = "Very weak";
    
    if (!password) {
      setPasswordStrength({ score: 0, text: "Password strength" });
      return;
    }
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine text based on score
    if (score === 1) text = "Weak";
    else if (score === 2) text = "Fair";
    else if (score === 3) text = "Good";
    else if (score === 4) text = "Strong";
    else if (score === 5) text = "Very strong";
    
    setPasswordStrength({ score, text });
  };
  
  // Reset form functions
  const resetGeneralSettings = () => {
    setGeneralSettings({
      systemName: "Lab Reservation System",
      institutionName: "BCI Higher Education Institution",
      timezone: "UTC+05:30",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12",
      academicYearStart: "9"
    });
  };
  
  const resetReservationSettings = () => {
    setReservationSettings({
      requireApprovalStudents: true,
      requireApprovalLecturers: false,
      maxReservationDaysAhead: 30,
      maxReservationDuration: 4,
      maxWeeklyReservations: 5,
      allowCancellationAfterStart: false,
      cancellationTimeLimit: 24
    });
  };
  
  const resetNotificationSettings = () => {
    setNotificationSettings({
      emailNotifications: true,
      browserNotifications: true,
      reservationReminders: true,
      reminderTime: 2,
      systemEmail: "no-reply@labreservation.edu"
    });
  };
  
  const resetProfileSettings = () => {
    setProfileSettings({
      name: "Admin User",
      email: "admin@example.com",
      phone: "+1234567890",
      department: "IT Department",
      title: "Department Coordinator",
      profileImage: "/assets/img/default-user.png"
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const resetSecuritySettings = () => {
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      enable2FA: false,
      sessionTimeout: 30
    });
    setPasswordStrength({ score: 0, text: "Password strength" });
  };
  
  // Form submission handlers
  const handleFormSubmit = (formName, e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActiveForm(formName);
    
    // In a real system, this would make API calls to save the settings
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActiveForm(null);
      }, 3000);
    }, 1500);
  };
  
  // Clear success message when tab changes
  useEffect(() => {
    setSubmitSuccess(false);
    setActiveForm(null);
  }, [activeTab]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#042E6F] mb-2">System Settings</h1>
      <p className="mb-6 text-gray-600">Configure system behavior and customize your experience.</p>
      
      {/* Settings Introduction Card */}
      <div className="bg-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-[#042E6F] mb-8 flex items-start">
        <div className="text-[#042E6F] text-3xl mr-4">
          <FaInfoCircle />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#042E6F] mb-1">Settings Control Panel</h3>
          <p className="text-gray-600">
            Welcome to the System Settings page. Here you can customize how the Lab Reservation System works without needing any technical knowledge. Changes will apply immediately after saving.
          </p>
        </div>
      </div>
      
      {/* Tabs Container */}
      <div className="tabs-container">
        {/* Tab Buttons */}
        <div className="flex flex-wrap border-b-2 border-gray-200 mb-6">
          <button
            className={`flex items-center px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${activeTab === "general" ? "bg-white text-[#042E6F] border-2 border-b-0 border-gray-200" : "text-gray-600 hover:text-[#042E6F] hover:bg-gray-100"}`}
            onClick={() => handleTabChange("general")}
          >
            <FaCog className="mr-2" /> General Settings
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${activeTab === "reservations" ? "bg-white text-[#042E6F] border-2 border-b-0 border-gray-200" : "text-gray-600 hover:text-[#042E6F] hover:bg-gray-100"}`}
            onClick={() => handleTabChange("reservations")}
          >
            <FaCalendarAlt className="mr-2" /> Reservation Settings
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${activeTab === "notifications" ? "bg-white text-[#042E6F] border-2 border-b-0 border-gray-200" : "text-gray-600 hover:text-[#042E6F] hover:bg-gray-100"}`}
            onClick={() => handleTabChange("notifications")}
          >
            <FaBell className="mr-2" /> Notification Settings
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${activeTab === "profile" ? "bg-white text-[#042E6F] border-2 border-b-0 border-gray-200" : "text-gray-600 hover:text-[#042E6F] hover:bg-gray-100"}`}
            onClick={() => handleTabChange("profile")}
          >
            <FaUser className="mr-2" /> Profile Settings
          </button>
          <button
            className={`flex items-center px-6 py-3 font-medium text-lg mr-2 rounded-t-lg ${activeTab === "security" ? "bg-white text-[#042E6F] border-2 border-b-0 border-gray-200" : "text-gray-600 hover:text-[#042E6F] hover:bg-gray-100"}`}
            onClick={() => handleTabChange("security")}
          >
            <FaShieldAlt className="mr-2" /> Security Settings
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="tab-content bg-white rounded-lg shadow-lg p-8 border border-gray-200 mb-8">
          {/* General Settings Tab */}
          <div className={activeTab === "general" ? "block" : "hidden"}>
            <h2 className="text-xl font-bold text-[#042E6F] flex items-center mb-4">
              <FaCog className="mr-2" /> General System Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Configure basic system settings like names, date formats, and timezones.
            </p>
            
            <form onSubmit={(e) => handleFormSubmit("general", e)} className="max-w-2xl">
              <div className="mb-6">
                <label htmlFor="general-systemName" className="block font-medium mb-2 text-gray-700">System Name</label>
                <input
                  type="text"
                  id="general-systemName"
                  value={generalSettings.systemName}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">The name displayed in the header and browser tab</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="general-institutionName" className="block font-medium mb-2 text-gray-700">Institution Name</label>
                <input
                  type="text"
                  id="general-institutionName"
                  value={generalSettings.institutionName}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Your organization or institution's name</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="general-timezone" className="block font-medium mb-2 text-gray-700">System Timezone</label>
                <select
                  id="general-timezone"
                  value={generalSettings.timezone}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                >
                  <optgroup label="Asia">
                    <option value="UTC+05:30">(UTC+05:30) Sri Lanka (Colombo)</option>
                    <option value="UTC+05:30">(UTC+05:30) India (Chennai, Mumbai, New Delhi)</option>
                    <option value="UTC+08:00">(UTC+08:00) Singapore, Malaysia, Philippines</option>
                    <option value="UTC+07:00">(UTC+07:00) Thailand, Vietnam</option>
                    <option value="UTC+09:00">(UTC+09:00) Japan, Korea</option>
                  </optgroup>
                  <optgroup label="Europe">
                    <option value="UTC+00:00">(UTC+00:00) London, Dublin, Edinburgh</option>
                    <option value="UTC+01:00">(UTC+01:00) Berlin, Paris, Rome, Madrid</option>
                    <option value="UTC+02:00">(UTC+02:00) Athens, Istanbul, Helsinki</option>
                  </optgroup>
                  <optgroup label="America">
                    <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option value="UTC-06:00">(UTC-06:00) Central Time (US & Canada)</option>
                    <option value="UTC-07:00">(UTC-07:00) Mountain Time (US & Canada)</option>
                    <option value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</option>
                  </optgroup>
                  <optgroup label="Australia & Pacific">
                    <option value="UTC+10:00">(UTC+10:00) Sydney, Melbourne, Brisbane</option>
                    <option value="UTC+12:00">(UTC+12:00) Auckland, Wellington</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="UTC+00:00">(UTC+00:00) Coordinated Universal Time</option>
                  </optgroup>
                </select>
                <p className="text-sm text-gray-500 mt-1">Timezone used for all dates and times in the system</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="general-dateFormat" className="block font-medium mb-2 text-gray-700">Date Format</label>
                <select
                  id="general-dateFormat"
                  value={generalSettings.dateFormat}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 31/12/2025)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 12/31/2025)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2025-12-31)</option>
                  <option value="DD-MMM-YYYY">DD-MMM-YYYY (e.g. 31-Dec-2025)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Format for displaying dates throughout the system</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="general-timeFormat" className="block font-medium mb-2 text-gray-700">Time Format</label>
                <select
                  id="general-timeFormat"
                  value={generalSettings.timeFormat}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                >
                  <option value="12">12-hour (AM/PM)</option>
                  <option value="24">24-hour</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Format for displaying times throughout the system</p>
              </div>
              
              <div className="mb-8">
                <label htmlFor="general-academicYearStart" className="block font-medium mb-2 text-gray-700">Academic Year Start Month</label>
                <select
                  id="general-academicYearStart"
                  value={generalSettings.academicYearStart}
                  onChange={handleGeneralChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Month when your academic year begins (affects reports and statistics)</p>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetGeneralSettings}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaSync className="mr-2" /> Reset to Default
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center ${isSubmitting && activeForm === "general" ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting && activeForm === "general"}
                >
                  {isSubmitting && activeForm === "general" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
              
              {submitSuccess && activeForm === "general" && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheck className="mr-2" /> General settings saved successfully!
                </div>
              )}
            </form>
          </div>
          
          {/* Reservation Settings Tab */}
          <div className={activeTab === "reservations" ? "block" : "hidden"}>
            <h2 className="text-xl font-bold text-[#042E6F] flex items-center mb-4">
              <FaCalendarAlt className="mr-2" /> Reservation Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Configure how lab reservations work, including approval requirements and time limits.
            </p>
            
            <form onSubmit={(e) => handleFormSubmit("reservations", e)} className="max-w-2xl">
              {/* Approval Requirements Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                  Approval Requirements
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label htmlFor="reservation-requireApprovalStudents" className="font-medium text-gray-700">
                        Require Approval for Student Reservations
                      </label>
                      <div className="relative inline-block group">
                        <FaQuestionCircle className="text-gray-400 hover:text-[#042E6F] cursor-help" />
                        <div className="absolute z-10 w-64 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                          If enabled, all student reservations must be approved by a lecturer or admin before being confirmed
                          <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="reservation-requireApprovalStudents"
                        checked={reservationSettings.requireApprovalStudents}
                        onChange={handleReservationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#042E6F] dark:peer-focus:ring-[#042E6F] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#042E6F]"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label htmlFor="reservation-requireApprovalLecturers" className="font-medium text-gray-700">
                        Require Approval for Lecturer Reservations
                      </label>
                      <div className="relative inline-block group">
                        <FaQuestionCircle className="text-gray-400 hover:text-[#042E6F] cursor-help" />
                        <div className="absolute z-10 w-64 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                          If enabled, lecturer reservations must be approved by an administrator
                          <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="reservation-requireApprovalLecturers"
                        checked={reservationSettings.requireApprovalLecturers}
                        onChange={handleReservationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#042E6F] dark:peer-focus:ring-[#042E6F] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#042E6F]"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Time Restrictions Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                  Time Restrictions
                </h3>
                
                <div className="mb-4">
                  <label htmlFor="reservation-maxReservationDaysAhead" className="block font-medium mb-2 text-gray-700">
                    Maximum Days in Advance for Reservations
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="reservation-maxReservationDaysAhead"
                      value={reservationSettings.maxReservationDaysAhead}
                      onChange={handleReservationChange}
                      min="1"
                      max="365"
                      className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                      required
                    />
                    <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">days</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Number of days in advance users can make reservations (1-365)</p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reservation-maxReservationDuration" className="block font-medium mb-2 text-gray-700">
                    Maximum Reservation Duration
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="reservation-maxReservationDuration"
                      value={reservationSettings.maxReservationDuration}
                      onChange={handleReservationChange}
                      min="1"
                      max="12"
                      className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                      required
                    />
                    <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">hours</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Maximum hours a single reservation can last (1-12)</p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reservation-maxWeeklyReservations" className="block font-medium mb-2 text-gray-700">
                    Maximum Weekly Reservations per User
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="reservation-maxWeeklyReservations"
                      value={reservationSettings.maxWeeklyReservations}
                      onChange={handleReservationChange}
                      min="1"
                      max="20"
                      className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                      required
                    />
                    <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">reservations</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Maximum number of reservations a user can have per week (1-20)</p>
                </div>
              </div>
              
              {/* Cancellation Policy Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                  Cancellation Policy
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label htmlFor="reservation-allowCancellationAfterStart" className="font-medium text-gray-700">
                        Allow Cancellation After Start Time
                      </label>
                      <div className="relative inline-block group">
                        <FaQuestionCircle className="text-gray-400 hover:text-[#042E6F] cursor-help" />
                        <div className="absolute z-10 w-64 bg-gray-800 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                          If enabled, users can cancel reservations even after the start time has passed
                          <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="reservation-allowCancellationAfterStart"
                        checked={reservationSettings.allowCancellationAfterStart}
                        onChange={handleReservationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#042E6F] dark:peer-focus:ring-[#042E6F] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#042E6F]"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reservation-cancellationTimeLimit" className="block font-medium mb-2 text-gray-700">
                    Cancellation Time Limit
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="reservation-cancellationTimeLimit"
                      value={reservationSettings.cancellationTimeLimit}
                      onChange={handleReservationChange}
                      min="1"
                      max="48"
                      className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                    />
                    <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">hours</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Time before the reservation start time when cancellation is no longer allowed (1-48 hours)</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetReservationSettings}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaSync className="mr-2" /> Reset to Default
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center ${isSubmitting && activeForm === "reservations" ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting && activeForm === "reservations"}
                >
                  {isSubmitting && activeForm === "reservations" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
              
              {submitSuccess && activeForm === "reservations" && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheck className="mr-2" /> Reservation settings saved successfully!
                </div>
              )}
            </form>
          </div>
          
          {/* Notification Settings Tab */}
          <div className={activeTab === "notifications" ? "block" : "hidden"}>
            <h2 className="text-xl font-bold text-[#042E6F] flex items-center mb-4">
              <FaBell className="mr-2" /> Notification Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Manage how you receive notifications about reservations and system updates.
            </p>
            
            <form onSubmit={(e) => handleFormSubmit("notifications", e)} className="max-w-2xl">
              <div className="mb-6">
                <label htmlFor="notification-emailNotifications" className="flex items-center gap-2 font-medium mb-4">
                  <input
                    type="checkbox"
                    id="notification-emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <div className="flex items-center cursor-pointer">
                    <div className="w-11 h-6 bg-gray-200 rounded-full transition-all duration-300 ease-in-out mr-2">
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ease-in-out ${notificationSettings.emailNotifications ? "translate-x-5" : ""}`}></div>
                    </div>
                    Receive email notifications
                  </div>
                </label>
                
                <div className="pl-8 mb-4">
                  <label htmlFor="notification-systemEmail" className="block font-medium mb-2 text-gray-700">System Email Address</label>
                  <input
                    type="email"
                    id="notification-systemEmail"
                    value={notificationSettings.systemEmail}
                    onChange={handleNotificationChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Email address used for sending notifications (e.g. no-reply@labreservation.edu)</p>
                </div>
                
                <div className="pl-8 mb-4">
                  <label htmlFor="notification-reminderTime" className="block font-medium mb-2 text-gray-700">Reservation Reminder Time</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="notification-reminderTime"
                      value={notificationSettings.reminderTime}
                      onChange={handleNotificationChange}
                      min="1"
                      max="24"
                      className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                      required
                    />
                    <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">hours</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">How many hours before a reservation starts should the reminder be sent?</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="notification-browserNotifications" className="flex items-center gap-2 font-medium mb-4">
                  <input
                    type="checkbox"
                    id="notification-browserNotifications"
                    checked={notificationSettings.browserNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only"
                  />
                  <div className="flex items-center cursor-pointer">
                    <div className="w-11 h-6 bg-gray-200 rounded-full transition-all duration-300 ease-in-out mr-2">
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ease-in-out ${notificationSettings.browserNotifications ? "translate-x-5" : ""}`}></div>
                    </div>
                    Enable browser notifications
                  </div>
                </label>
                
                <div className="pl-8">
                  <p className="text-sm text-gray-500 mb-4">
                    Browser notifications let you receive alerts even when the system is not open. 
                    <a href="#" className="text-[#042E6F] hover:underline"> Learn more</a>
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetNotificationSettings}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaSync className="mr-2" /> Reset to Default
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center ${isSubmitting && activeForm === "notifications" ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting && activeForm === "notifications"}
                >
                  {isSubmitting && activeForm === "notifications" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
              
              {submitSuccess && activeForm === "notifications" && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheck className="mr-2" /> Notification settings saved successfully!
                </div>
              )}
            </form>
          </div>
          
          {/* Profile Settings Tab */}
          <div className={activeTab === "profile" ? "block" : "hidden"}>
            <h2 className="text-xl font-bold text-[#042E6F] flex items-center mb-4">
              <FaUser className="mr-2" /> Profile Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Update your profile information and change your password.
            </p>
            
            <form onSubmit={(e) => handleFormSubmit("profile", e)} className="max-w-2xl">
              <div className="mb-6">
                <label htmlFor="profile-name" className="block font-medium mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="profile-name"
                  value={profileSettings.name}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Your full name as displayed in the system</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-email" className="block font-medium mb-2 text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="profile-email"
                  value={profileSettings.email}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Your email address for login and notifications</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-phone" className="block font-medium mb-2 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="profile-phone"
                  value={profileSettings.phone}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                />
                <p className="text-sm text-gray-500 mt-1">Optional: Your phone number for contact purposes</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-department" className="block font-medium mb-2 text-gray-700">Department</label>
                <input
                  type="text"
                  id="profile-department"
                  value={profileSettings.department}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                />
                <p className="text-sm text-gray-500 mt-1">Optional: Your department or section</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-title" className="block font-medium mb-2 text-gray-700">Job Title</label>
                <input
                  type="text"
                  id="profile-title"
                  value={profileSettings.title}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                />
                <p className="text-sm text-gray-500 mt-1">Optional: Your job title or position</p>
              </div>
              
              <div className="mb-6">
                <label className="block font-medium mb-2 text-gray-700">Profile Image</label>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 mr-4">
                    <img src={profileSettings.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <span className="px-4 py-2 bg-[#042E6F] text-white rounded-lg shadow-md hover:bg-[#021E47] transition mr-3">
                      <FaUpload className="mr-2" /> Upload Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                      ref={fileInputRef}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Recommended size: 256x256px. Max size: 2MB.</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-currentPassword" className="block font-medium mb-2 text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="profile-currentPassword"
                  value={securitySettings.currentPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="profile-newPassword" className="block font-medium mb-2 text-gray-700">New Password</label>
                <input
                  type="password"
                  id="profile-newPassword"
                  value={securitySettings.newPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Leave blank to keep current password</p>
              </div>
              
              <div className="mb-8">
                <label htmlFor="profile-confirmPassword" className="block font-medium mb-2 text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  id="profile-confirmPassword"
                  value={securitySettings.confirmPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Re-enter new password to confirm</p>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setProfileSettings({
                    name: "Admin User",
                    email: "admin@example.com",
                    phone: "+1234567890",
                    department: "IT Department",
                    title: "Department Coordinator",
                    profileImage: "/assets/img/default-user.png"
                  })}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaSync className="mr-2" /> Reset to Default
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center ${isSubmitting && activeForm === "profile" ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting && activeForm === "profile"}
                >
                  {isSubmitting && activeForm === "profile" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
              
              {submitSuccess && activeForm === "profile" && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheck className="mr-2" /> Profile settings saved successfully!
                </div>
              )}
            </form>
          </div>
          
          {/* Security Settings Tab */}
          <div className={activeTab === "security" ? "block" : "hidden"}>
            <h2 className="text-xl font-bold text-[#042E6F] flex items-center mb-4">
              <FaShieldAlt className="mr-2" /> Security Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Enhance the security of your account and manage session settings.
            </p>
            
            <form onSubmit={(e) => handleFormSubmit("security", e)} className="max-w-2xl">
              <div className="mb-6">
                <label htmlFor="security-currentPassword" className="block font-medium mb-2 text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="security-currentPassword"
                  value={securitySettings.currentPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="security-newPassword" className="block font-medium mb-2 text-gray-700">New Password</label>
                <input
                  type="password"
                  id="security-newPassword"
                  value={securitySettings.newPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Leave blank to keep current password</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="security-confirmPassword" className="block font-medium mb-2 text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  id="security-confirmPassword"
                  value={securitySettings.confirmPassword}
                  onChange={handleSecurityChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Re-enter new password to confirm</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="security-enable2FA" className="flex items-center gap-2 font-medium mb-4">
                  <input
                    type="checkbox"
                    id="security-enable2FA"
                    checked={securitySettings.enable2FA}
                    onChange={handleSecurityChange}
                    className="sr-only"
                  />
                  <div className="flex items-center cursor-pointer">
                    <div className="w-11 h-6 bg-gray-200 rounded-full transition-all duration-300 ease-in-out mr-2">
                      <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ease-in-out ${securitySettings.enable2FA ? "translate-x-5" : ""}`}></div>
                    </div>
                    Enable Two-Factor Authentication (2FA)
                  </div>
                </label>
                
                <div className="pl-8 mb-4">
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security by requiring a verification code in addition to your password
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="security-sessionTimeout" className="block font-medium mb-2 text-gray-700">Session Timeout</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="security-sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    min="5"
                    max="180"
                    className="w-24 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                  />
                  <span className="bg-gray-100 px-4 py-2 rounded-r border border-l-0 border-gray-300 text-gray-600">minutes</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Time of inactivity before automatic logout (5-180 minutes)</p>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={resetSecuritySettings}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center"
                >
                  <FaSync className="mr-2" /> Reset
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition flex items-center ${isSubmitting && activeForm === "security" ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting && activeForm === "security"}
                >
                  {isSubmitting && activeForm === "security" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Update Security Settings
                    </>
                  )}
                </button>
              </div>
              
              {submitSuccess && activeForm === "security" && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                  <FaCheck className="mr-2" /> Security settings updated successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal (would be displayed when user enables 2FA) */}
      {securitySettings.enable2FA && false && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#042E6F] mb-4 flex items-center">
              <FaShieldAlt className="mr-2" /> Set Up Two-Factor Authentication
            </h3>
            <div className="mb-6">
              <p className="mb-4 text-gray-600">
                Scan the QR code below with your authenticator app (like Google Authenticator or Authy)
                to set up two-factor authentication.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-4">
                {/* QR Code would be here */}
                <div className="bg-white p-2 border border-gray-300 rounded">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">QR Code</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                If you can't scan the QR code, you can manually enter this key in your app:
              </p>
              <div className="bg-gray-100 p-3 rounded font-mono text-center mb-4">
                ABCD 1234 EFGH 5678
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2 text-gray-700">Verification Code</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#042E6F] focus:border-[#042E6F]"
                placeholder="Enter the 6-digit code from your app"
                maxLength="6"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                onClick={() => {}}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-[#042E6F] text-white rounded-lg hover:bg-[#021E47] transition"
                onClick={() => {}}
              >
                Verify and Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
