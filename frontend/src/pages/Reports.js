import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaFileAlt, FaEye } from 'react-icons/fa';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Reports</h1>
          <p className="text-gray-600">View and manage your property valuation reports</p>
        </div>
        <Link to="/create-report" className="btn-primary flex items-center gap-2">
          <FaFileAlt /> New Report
        </Link>
      </div>
      
      {reports.length === 0 ? (
        <div className="card p-12 text-center">
          <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Yet</h3>
          <p className="text-gray-500 mb-6">Create your first property valuation report to get started</p>
          <Link to="/create-report" className="btn-primary">
            Create Your First Report
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {report.propertyDetails?.address || 'Property Report'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    +₹{report.projectedValueIncrease?.toLocaleString() || 0}
                  </p>
                  <Link to={/reports/} className="text-purple-600 text-sm hover:underline flex items-center gap-1 mt-2">
                    <FaEye /> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
