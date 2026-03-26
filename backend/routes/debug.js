const express = require('express');
const User = require('../models/User');
const Improvement = require('../models/Improvement');
const Report = require('../models/Report');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const improvements = await Improvement.find();
    const reports = await Report.find().populate('userId', 'name email');
    
    res.json({
      users: users.length,
      improvements: improvements.length,
      reports: reports.length,
      data: {
        users,
        improvements,
        reports
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;