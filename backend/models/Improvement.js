const mongoose = require('mongoose');

const improvementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  effort: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  roi: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  impact: {
    type: Number,
    min: 1,
    max: 25,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  room: {
    type: String,
    enum: ['All', 'Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Exterior'],
    required: true
  },
  tags: [{
    type: String
  }],
  indianSpecific: {
    type: Boolean,
    default: true
  },
  budgetRange: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Improvement', improvementSchema);