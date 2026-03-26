import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUsers, FaClipboardList, FaHome } from 'react-icons/fa';

const AdminPanel = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalReports: 0, totalImprovements: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Monitor platform statistics</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaUsers className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalUsers}</span>
          </div>
          <h3 className="text-gray-600">Total Users</h3>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaClipboardList className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalReports}</span>
          </div>
          <h3 className="text-gray-600">Total Reports</h3>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaHome className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalImprovements}</span>
          </div>
          <h3 className="text-gray-600">Improvements</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
