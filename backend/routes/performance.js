const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

router.get('/:districtName', performanceController.getDistrictPerformance);
router.get('/comparison', performanceController.getComparisonData);
router.get('/trend/:districtName', performanceController.getHistoricalTrend);

module.exports = router;
