import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FaClipboardList, FaChartLine, FaHome, FaPlus, FaArrowRight } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalReports: 0, totalImprovements: 0, avgValueIncrease: 0 });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const reportsRes = await api.get('/reports');
      const improvementsRes = await api.get('/improvements');
      
      const reports = reportsRes.data;
      setRecentReports(reports.slice(0, 5));
      
      const totalValueIncrease = reports.reduce((sum, report) => sum + (report.projectedValueIncrease || 0), 0);
      
      setStats({
        totalReports: reports.length,
        totalImprovements: improvementsRes.data.length,
        avgValueIncrease: reports.length ? Math.round(totalValueIncrease / reports.length) : 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { month: 'Jan', value: 5000 },
    { month: 'Feb', value: 7500 },
    { month: 'Mar', value: 10000 },
    { month: 'Apr', value: 15000 },
    { month: 'May', value: 20000 },
    { month: 'Jun', value: 25000 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Track your home improvement journey and maximize your property value.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaClipboardList className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalReports}</span>
          </div>
          <h3 className="text-gray-600">Total Reports</h3>
          <p className="text-sm text-gray-500 mt-2">Property valuation reports created</p>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaHome className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">{stats.totalImprovements}</span>
          </div>
          <h3 className="text-gray-600">Improvement Ideas</h3>
          <p className="text-sm text-gray-500 mt-2">Available home improvements</p>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <FaChartLine className="text-3xl text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">₹{stats.avgValueIncrease.toLocaleString()}</span>
          </div>
          <h3 className="text-gray-600">Avg. Value Increase</h3>
          <p className="text-sm text-gray-500 mt-2">Per improvement project</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Projected Value Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Improvement Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Kitchen', impact: 20 },
              { name: 'Bathroom', impact: 12 },
              { name: 'Living', impact: 10 },
              { name: 'Bedroom', impact: 15 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impact" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          <Link to="/reports" className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
            View All <FaArrowRight />
          </Link>
        </div>
        
        {recentReports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No reports yet</p>
            <Link to="/create-report" className="btn-primary inline-flex items-center gap-2">
              <FaPlus /> Create Your First Report
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {report.propertyDetails?.address || 'Property Report'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">
                      +₹{report.projectedValueIncrease?.toLocaleString()}
                    </p>
                    <Link to={`/reports/${report._id}`} className="text-purple-600 text-sm hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;