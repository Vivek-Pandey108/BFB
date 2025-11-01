const District = require('../models/District');
const mgnregaService = require('../services/mgnregaService');

exports.getDistrictPerformance = async (req, res) => {
  try {
    const { districtName } = req.params;
    
    const district = await District.findOne({ 
      name: new RegExp(districtName, 'i'),
      state: 'Uttar Pradesh'
    });

    if (!district) {
      return res.status(404).json({ error: 'District not found' });
    }

    res.json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComparisonData = async (req, res) => {
  try {
    const { metric, year } = req.query;
    
    const districts = await District.find({ 
      state: 'Uttar Pradesh',
      'latestPerformance.year': year || new Date().getFullYear()
    }).select(`name latestPerformance.${metric}`);

    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricalTrend = async (req, res) => {
  try {
    const { districtName } = req.params;
    
    const district = await District.findOne({ 
      name: new RegExp(districtName, 'i'),
      state: 'Uttar Pradesh'
    });

    if (!district) {
      return res.status(404).json({ error: 'District not found' });
    }

    const trend = [district.latestPerformance, ...district.historicalData];
    res.json(trend);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
