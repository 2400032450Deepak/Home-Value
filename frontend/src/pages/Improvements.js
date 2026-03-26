import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaSearch, FaFilter, FaClock, FaRupeeSign, FaChartLine, FaTag } from 'react-icons/fa';

const Improvements = () => {
  const [improvements, setImprovements] = useState([]);
  const [filteredImprovements, setFilteredImprovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    room: 'All',
    cost: 'All',
    effort: 'All',
    search: ''
  });

  useEffect(() => {
    fetchImprovements();
  }, []);

  useEffect(() => {
    filterImprovements();
  }, [filters, improvements]);

  const fetchImprovements = async () => {
    try {
      const response = await api.get('/improvements');
      setImprovements(response.data);
      setFilteredImprovements(response.data);
    } catch (error) {
      console.error('Error fetching improvements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImprovements = () => {
    let filtered = [...improvements];
    
    if (filters.search) {
      filtered = filtered.filter(imp => 
        imp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        imp.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.room !== 'All') {
      filtered = filtered.filter(imp => imp.room === filters.room);
    }
    
    if (filters.cost !== 'All') {
      filtered = filtered.filter(imp => imp.cost === filters.cost);
    }
    
    if (filters.effort !== 'All') {
      filtered = filtered.filter(imp => imp.effort === filters.effort);
    }
    
    setFilteredImprovements(filtered);
  };

  const getCostColor = (cost) => {
    switch(cost) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getROIColor = (roi) => {
    switch(roi) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const rooms = ['All', 'Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Exterior'];
  const costs = ['All', 'Low', 'Medium', 'High'];
  const efforts = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Home Improvements</h1>
        <p className="text-gray-600">Discover the best improvements to increase your home's value</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search improvements..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={filters.room}
            onChange={(e) => setFilters({...filters, room: e.target.value})}
            className="input-field"
          >
            {rooms.map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
          
          <select
            value={filters.cost}
            onChange={(e) => setFilters({...filters, cost: e.target.value})}
            className="input-field"
          >
            {costs.map(cost => (
              <option key={cost} value={cost}>Cost: {cost}</option>
            ))}
          </select>
          
          <select
            value={filters.effort}
            onChange={(e) => setFilters({...filters, effort: e.target.value})}
            className="input-field"
          >
            {efforts.map(effort => (
              <option key={effort} value={effort}>Effort: {effort}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImprovements.map((improvement) => (
          <div key={improvement._id} className="card hover:transform hover:scale-105 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{improvement.title}</h3>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${getCostColor(improvement.cost)}`}>
                  {improvement.cost} Cost
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{improvement.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FaTag className="text-purple-600" />
                  <span className="text-gray-600">Room: {improvement.room}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaClock className="text-purple-600" />
                  <span className="text-gray-600">Duration: {improvement.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaRupeeSign className="text-purple-600" />
                  <span className="text-gray-600">Budget: {improvement.budgetRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaChartLine className="text-purple-600" />
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getROIColor(improvement.roi)}`}>
                    ROI: {improvement.roi}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {improvement.tags?.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImprovements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No improvements found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Improvements;