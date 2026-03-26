import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaArrowLeft, FaHome, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(/reports/);
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
        toast.error('Failed to load report');
        navigate('/reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button onClick={() => navigate('/reports')} className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
          <FaArrowLeft /> Back to Reports
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Property Valuation Report</h1>
          <p className="opacity-90">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="p-8 border-b">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaHome className="text-purple-600" /> Property Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium">{report.propertyDetails?.address || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Property Type</p>
              <p className="font-medium">{report.propertyDetails?.propertyType || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Value</p>
              <p className="font-medium text-lg text-purple-600">
                ₹{report.propertyDetails?.currentValue?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaChartLine className="text-purple-600" /> Financial Summary
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Total Investment</p>
              <p className="text-2xl font-bold text-gray-800">₹{report.totalEstimatedCost?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Projected Increase</p>
              <p className="text-2xl font-bold text-green-600">+₹{report.projectedValueIncrease?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-500 text-sm">Selected Improvements</p>
              <p className="text-2xl font-bold text-purple-600">{report.selectedImprovements?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
