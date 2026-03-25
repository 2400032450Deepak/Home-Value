const express = require('express');
const Report = require('../models/Report');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const report = await Report.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .populate('selectedImprovements.improvementId');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('selectedImprovements.improvementId');
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;