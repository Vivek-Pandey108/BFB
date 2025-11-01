const express = require('express');
const router = express.Router();
const District = require('../models/District');

// Get all districts
router.get('/', async (req, res) => {
  try {
    const districts = await District.find({ state: 'Uttar Pradesh' })
      .select('name pincode districtCode latestPerformance');
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single district
router.get('/:name', async (req, res) => {
  try {
    const district = await District.findOne({ 
      name: new RegExp(req.params.name, 'i'),
      state: 'Uttar Pradesh'
    });
    
    if (!district) {
      return res.status(404).json({ error: 'District not found' });
    }
    
    res.json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
