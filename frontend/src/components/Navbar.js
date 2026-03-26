import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaChartLine, FaClipboardList, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome className="text-2xl text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              HomeValor
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/improvements" className="text-gray-600 hover:text-purple-600 transition">
              Improvements
            </Link>
            
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition">
                  Dashboard
                </Link>
                <Link to="/reports" className="text-gray-600 hover:text-purple-600 transition">
                  My Reports
                </Link>
                <Link to="/create-report" className="btn-primary text-sm">
                  Create Report
                </Link>
              </>
            )}

            {user?.isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-purple-600 transition">
                <FaCog />
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-purple-600 transition">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;