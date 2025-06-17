/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaIdBadge, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Registration form, 2: Success message
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    role: "Student",
    studentId: "",
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Password matching
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Student ID validation for students
    if (formData.role === "Student" && !formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required for students";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to register user
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Move to success step
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {step === 1 ? (
          <>
            <div className="text-center">
              <img 
                src="/BCI logo_blue.png" 
                alt="Logo" 
                className="mx-auto h-20 w-40 object-contain"
              />
              <h2 className="mt-4 text-3xl font-bold text-[#042E6F]">Create an Account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill in your details to request an account. Your request will be reviewed by an administrator.
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="bg-blue-50 border-l-4 border-[#042E6F] p-4 rounded mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Your account will need to be approved by a lab coordinator before you can access the system. You'll receive an email notification once your account is approved.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                            placeholder="First Name"
                          />
                        </div>
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                      </div>
                      
                      <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                          placeholder="Last Name"
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                          placeholder="Email Address"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaBuilding className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                          placeholder="Your Department"
                        />
                      </div>
                      {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-medium text-[#042E6F] mb-4 pb-2 border-b border-gray-200">
                    Account Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                      >
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                      </select>
                    </div>
                    
                    {formData.role === "Student" && (
                      <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                          Student ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaIdBadge className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.studentId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                            placeholder="Your Student ID"
                          />
                        </div>
                        {errors.studentId && <p className="mt-1 text-sm text-red-500">{errors.studentId}</p>}
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                          placeholder="Create a password"
                        />
                      </div>
                      {errors.password ? (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]`}
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Short Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                        placeholder="Briefly tell us about yourself (optional)"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Link to="/login" className="text-[#042E6F] hover:text-blue-700 flex items-center">
                  <FaArrowLeft className="mr-2" /> Back to Login
                </Link>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 bg-[#042E6F] text-white rounded-md hover:bg-[#021E47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#042E6F] transition flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Registration Request"}
                </button>
              </div>
            </form>
          </>
        ) : (
          // Success message (step 2)
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
              <FaCheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            
            <div className="bg-blue-50 rounded-lg p-6 text-left mb-6 max-w-lg mx-auto">
              <h3 className="font-semibold text-lg text-[#042E6F] mb-2">What happens next?</h3>
              <p className="text-gray-700 mb-4">
                Your account request has been submitted and is awaiting approval from a lab coordinator or administrator.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>You'll receive an email notification when your account is approved</li>
                <li>The approval process typically takes 1-2 business days</li>
                <li>Once approved, you can log in with the email and password you provided</li>
              </ul>
            </div>
            
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-[#042E6F] text-white rounded-md hover:bg-[#021E47] transition"
            >
              Return to Login Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
