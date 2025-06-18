/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
import { Link } from "react-router-dom";
import { FaHourglassHalf, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const PendingApproval = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#042E6F] to-[#1068b9] p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <Link to="/login" className="text-[#042E6F] hover:underline flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Login
          </Link>
        </div>
        
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/img/BCI logo_blue.png" 
            alt="Logo" 
            className="h-16 bg-white p-2 rounded shadow"
          />
        </div>
        
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaHourglassHalf className="text-yellow-500 text-3xl" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#042E6F] mb-4">Registration Pending</h1>
        
        <p className="text-gray-600 mb-6">
          Your account registration is currently pending approval from the system administrator. 
          You'll receive an email notification once your account is approved.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-[#042E6F] mb-2 flex items-center">
            <FaEnvelope className="mr-2" /> Next Steps
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            <li>An administrator will review your registration details</li>
            <li>You'll receive an email notification when your account is approved</li>
            <li>Once approved, you can log in with your credentials</li>
            <li>If you need immediate assistance, please contact the system administrator</li>
          </ul>
        </div>
        
        <p className="text-sm text-gray-500">
          If you have any questions or concerns, please contact 
          <a href="mailto:support@campus.edu" className="text-[#042E6F] hover:underline ml-1">
            support@campus.edu
          </a>
        </p>
      </div>
    </div>
  );
};

export default PendingApproval;
          