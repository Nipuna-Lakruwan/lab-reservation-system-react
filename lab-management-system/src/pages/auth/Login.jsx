/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call for authentication
    setTimeout(() => {
      const { email, password } = credentials;

      // Demo authentication logic
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("user", JSON.stringify({ name: "Admin User", email }));
        navigate("/");
      } else if (email === "lecturer@example.com" && password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "lecturer");
        localStorage.setItem("user", JSON.stringify({ name: "Dr. Sarah Johnson", email }));
        navigate("/lecturer");
      } else if (email === "student@example.com" && password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "student");
        localStorage.setItem("user", JSON.stringify({ name: "John Smith", email }));
        navigate("/student");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for password reset
    setTimeout(() => {
      setResetSent(true);
      setLoading(false);
    }, 1500);
  };

  // Render forgot password form
  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center">
            <img
              src="/BCI logo_blue.png"
              alt="Logo"
              className="mx-auto h-20 w-40 object-contain"
            />
            <h2 className="mt-4 text-3xl font-bold text-[#042E6F]">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address to receive a password reset link
            </p>
          </div>

          {resetSent ? (
            <div className="mt-8 text-center">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
                <p className="text-green-700">
                  Password reset link has been sent to your email.
                </p>
              </div>
              <button
                onClick={() => {
                  setForgotPassword(false);
                  setResetSent(false);
                }}
                className="text-[#042E6F] hover:underline"
              >
                Return to login
              </button>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="rounded-md -space-y-px">
                <div className="mb-4">
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="reset-email"
                      name="reset-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setForgotPassword(false)}
                  className="text-[#042E6F] hover:underline"
                >
                  Back to login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative flex justify-center py-2 px-4 border border-transparent rounded-md text-white font-medium ${loading ? "bg-blue-400" : "bg-[#042E6F] hover:bg-[#021E47]"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#042E6F] transition duration-150`}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Render login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <img
            src="/BCI logo_blue.png"
            alt="Logo"
            className="mx-auto h-20 w-40 object-contain"
          />
          <h2 className="mt-4 text-3xl font-bold text-[#042E6F]">Lab Reservation System</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#042E6F] focus:border-[#042E6F]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#042E6F] focus:ring-[#042E6F] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="font-medium text-[#042E6F] hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white font-medium ${loading ? "bg-blue-400" : "bg-[#042E6F] hover:bg-[#021E47]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#042E6F] transition duration-150`}
            >
              {loading ? (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaSignInAlt className="h-5 w-5 text-white" />
                  </span>
                  Sign in
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-[#042E6F] hover:text-blue-500 inline-flex items-center">
                Create account <FaUserPlus className="ml-1" />
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Development Credentials</p>
          <div className="mt-2 bg-gray-50 p-3 rounded-lg text-xs">
            <div className="mb-2">
              <p className="font-semibold">Admin Login:</p>
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Lecturer Login:</p>
              <p><strong>Email:</strong> lecturer@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
            <div>
              <p className="font-semibold">Student Login:</p>
              <p><strong>Email:</strong> student@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
