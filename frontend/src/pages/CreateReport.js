import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const CreateReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    propertyType: 'Apartment',
    area: '',
    bedrooms: 2,
    bathrooms: 2,
    age: 5,
    currentValue: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!propertyDetails.address) {
      toast.error('Please enter property address');
      return;
    }
    
    setLoading(true);
    
    try {
      const reportData = {
        propertyDetails: {
          ...propertyDetails,
          area: parseFloat(propertyDetails.area) || 0,
          bedrooms: parseInt(propertyDetails.bedrooms),
          bathrooms: parseInt(propertyDetails.bathrooms),
          age: parseInt(propertyDetails.age),
          currentValue: parseFloat(propertyDetails.currentValue) || 0
        },
        selectedImprovements: [],
        totalEstimatedCost: 0,
        projectedValueIncrease: 0,
        reportStatus: 'completed'
      };
      
      const response = await api.post('/reports', reportData);
      toast.success('Report created successfully!');
      navigate(/reports/);
    } catch (error) {
      console.error('Error creating report:', error);
      toast.error('Failed to create report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Valuation Report</h1>
        <p className="text-gray-600">Get a comprehensive analysis of your home improvement potential</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                value={propertyDetails.address}
                onChange={(e) => setPropertyDetails({...propertyDetails, address: e.target.value})}
                className="input-field"
                placeholder="Enter property address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={propertyDetails.propertyType}
                onChange={(e) => setPropertyDetails({...propertyDetails, propertyType: e.target.value})}
                className="input-field"
              >
                <option>Apartment</option>
                <option>Independent House</option>
                <option>Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Value (₹)</label>
              <input
                type="number"
                value={propertyDetails.currentValue}
                onChange={(e) => setPropertyDetails({...propertyDetails, currentValue: e.target.value})}
                className="input-field"
                placeholder="e.g., 5000000"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/reports')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Creating...' : 'Create Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
