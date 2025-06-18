/**
 * Copyright (c) 2025 Nipuna Lakruwan
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaKey } from "react-icons/fa";

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
      // For demo purposes - in real app you would verify with backend
      if (credentials.email === "admin@example.com" && credentials.password === "password") {
        // Set authentication state in localStorage for admin
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("user", JSON.stringify({
          name: "Admin User",
          email: credentials.email,
          role: "Admin"
        }));

        // Successful login - navigate to dashboard
        navigate("/");
      } else if (credentials.email === "lecturer@example.com" && credentials.password === "password") {
        // Set authentication state in localStorage for lecturer
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "lecturer");
        localStorage.setItem("user", JSON.stringify({
          name: "Dr. Sarah Johnson",
          email: credentials.email,
          role: "Lecturer"
        }));

        // Successful login - navigate to lecturer dashboard
        navigate("/lecturer");
      } else {
        // Failed login
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for password reset
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);

      // In a real application, this would send a reset email
      console.log(`Password reset requested for: ${resetEmail}`);
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
              {resetSent
                ? "Check your email for password reset instructions"
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {resetSent ? (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-700 text-sm">
                  Password reset link has been sent to your email address. Please check your inbox and follow the instructions.
                </p>
              </div>

              <button
                onClick={() => setForgotPassword(false)}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white font-medium bg-[#042E6F] hover:bg-[#021E47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#042E6F] transition duration-150"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="rounded-md -space-y-px">
                <div className="mb-4">
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="reset-email"
                      name="email"
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

              <div className="flex flex-col space-y-3">
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <FaKey className="h-5 w-5 text-white" />
                      </span>
                      Send Reset Link
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setForgotPassword(false)}
                  className="text-[#042E6F] hover:underline text-center"
                >
                  Back to Login
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

        {/* Development helper - remove in production */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Development Credentials</p>
          <div className="mt-2 bg-gray-50 p-3 rounded-lg text-xs">
            <div className="mb-2">
              <p className="font-semibold">Admin Login:</p>
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
            <div>
              <p className="font-semibold">Lecturer Login:</p>
              <p><strong>Email:</strong> lecturer@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
