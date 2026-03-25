const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyDetails: {
    address: String,
    propertyType: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    age: Number,
    currentValue: Number
  },
  selectedImprovements: [{
    improvementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Improvement'
    },
    estimatedCost: Number,
    priority: Number
  }],
  totalEstimatedCost: Number,
  projectedValueIncrease: Number,
  reportStatus: {
    type: String,
    enum: ['draft', 'completed', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);