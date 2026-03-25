const express = require('express');
const Improvement = require('../models/Improvement');
const User = require('../models/User');
const Report = require('../models/Report');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/improvements', adminAuth, async (req, res) => {
  try {
    const improvement = await Improvement.create(req.body);
    res.status(201).json(improvement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/improvements/:id', adminAuth, async (req, res) => {
  try {
    const improvement = await Improvement.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!improvement) {
      return res.status(404).json({ message: 'Improvement not found' });
    }
    res.json(improvement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReports = await Report.countDocuments();
    const totalImprovements = await Improvement.countDocuments();
    
    res.json({
      totalUsers,
      totalReports,
      totalImprovements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;