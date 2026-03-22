const express = require('express');
const Improvement = require('../models/Improvement');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { room, cost, effort } = req.query;
    let filter = { isActive: true };
    
    if (room && room !== 'All') filter.room = room;
    if (cost && cost !== 'All') filter.cost = cost;
    if (effort && effort !== 'All') filter.effort = effort;

    const improvements = await Improvement.find(filter);
    res.json(improvements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const improvement = await Improvement.findById(req.params.id);
    if (!improvement) {
      return res.status(404).json({ message: 'Improvement not found' });
    }
    res.json(improvement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;