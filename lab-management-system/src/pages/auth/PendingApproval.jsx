/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const PendingApproval = () => {
  // This would normally come from your authentication context/state
  const userEmail = "user@example.com";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <img 
            src="/BCI logo_blue.png" 
            alt="Logo" 
            className="mx-auto h-16 w-16 object-contain"
          />
          <h2 className="mt-4 text-2xl font-bold text-[#042E6F]">Account Pending Approval</h2>
        </div>
        
        <div className="rounded-lg bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaClock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your account is currently pending approval by an administrator. You'll be notified via email once your account is approved.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
          
          <div className="flex items-center mb-4">
            <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700">{userEmail}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">What happens next?</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>A lab coordinator will review your registration</li>
              <li>You'll receive an email notification when your account is approved</li>
              <li>The process typically takes 1-2 business days</li>
              <li>After approval, you can log in with your credentials</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col space-y-3">
          <p className="text-center text-sm text-gray-600">
            If you need immediate assistance or have questions about your account status, please contact your lab administrator.
          </p>
          
          <Link 
            to="/login" 
            className="w-full flex justify-center items-center px-4 py-2 text-[#042E6F] bg-white border border-[#042E6F] rounded-md hover:bg-blue-50 transition"
          >
            <FaSignOutAlt className="mr-2" /> Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
