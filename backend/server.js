// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Mock Districts Data
// const districts = [
//   { id: 1, name: 'Lucknow', pincode: '226001' },
//   { id: 2, name: 'Agra', pincode: '282001' },
//   { id: 3, name: 'Varanasi', pincode: '221001' },
//   { id: 4, name: 'Kanpur', pincode: '208001' },
//   { id: 5, name: 'Bareilly', pincode: '243001' },
//   { id: 6, name: 'Meerut', pincode: '250001' },
//   { id: 7, name: 'Aligarh', pincode: '202001' },
//   { id: 8, name: 'Ghaziabad', pincode: '201001' },
//   { id: 9, name: 'Moradabad', pincode: '244001' },
//   { id: 10, name: 'Mathura', pincode: '281001' }
// ];

// // Routes
// app.get('/api/test', (req, res) => {
//   res.json({ message: '✅ Backend is working!' });
// });

// app.get('/api/districts', (req, res) => {
//   console.log('✅ Districts API called');
//   res.json(districts);
// });

// app.get('/api/performance/:districtName', (req, res) => {
//   const { districtName } = req.params;
//   console.log(`✅ Performance API called for: ${districtName}`);
  
//   const mockData = {
//     name: districtName,
//     latestPerformance: {
//       jobCardsIssued: Math.floor(Math.random() * 100000) + 50000,
//       activeWorkers: Math.floor(Math.random() * 80000) + 30000,
//       personDaysGenerated: Math.floor(Math.random() * 5000000) + 1000000,
//       householdsEmployed: Math.floor(Math.random() * 50000) + 10000,
//       womenParticipation: Math.floor(Math.random() * 30) + 50,
//       scParticipation: Math.floor(Math.random() * 30) + 15,
//       stParticipation: Math.floor(Math.random() * 20) + 10,
//       totalFundReleased: Math.floor(Math.random() * 100000000) + 20000000
//     }
//   };
  
//   res.json(mockData);
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(500).json({ error: 'Server error' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log('');
//   console.log('='.repeat(50));
//   console.log('🚀 MGNREGA Backend Server');
//   console.log('='.repeat(50));
//   console.log(`✅ Server running on: http://localhost:${PORT}`);
//   console.log(`✅ Test endpoint: http://localhost:${PORT}/api/test`);
//   console.log(`✅ Districts endpoint: http://localhost:${PORT}/api/districts`);
//   console.log('='.repeat(50));
//   console.log('');
// });

// module.exports = app;


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// All 75 UP Districts - Database (stored in memory for now, can be moved to MongoDB later)
const districtsDB = [
  { id: 1, name: 'Agra', pincode: '282001' },
  { id: 2, name: 'Aligarh', pincode: '202001' },
  { id: 3, name: 'Ambedkar Nagar', pincode: '224122' },
  { id: 4, name: 'Amethi', pincode: '229403' },
  { id: 5, name: 'Amroha', pincode: '244401' },
  { id: 6, name: 'Auraiya', pincode: '205101' },
  { id: 7, name: 'Azamgarh', pincode: '276001' },
  { id: 8, name: 'Badaun', pincode: '243601' },
  { id: 9, name: 'Bagpat', pincode: '250609' },
  { id: 10, name: 'Bahraich', pincode: '271801' },
  { id: 11, name: 'Ballia', pincode: '277001' },
  { id: 12, name: 'Balrampur', pincode: '271201' },
  { id: 13, name: 'Banda', pincode: '210001' },
  { id: 14, name: 'Barabanki', pincode: '225001' },
  { id: 15, name: 'Bareilly', pincode: '243001' },
  { id: 16, name: 'Basti', pincode: '272801' },
  { id: 17, name: 'Bijnor', pincode: '246701' },
  { id: 18, name: 'Budaun', pincode: '243601' },
  { id: 19, name: 'Bulandshahr', pincode: '203001' },
  { id: 20, name: 'Chandauli', pincode: '232104' },
  { id: 21, name: 'Chitrakoot', pincode: '210204' },
  { id: 22, name: 'Deoria', pincode: '274401' },
  { id: 23, name: 'Etah', pincode: '245304' },
  { id: 24, name: 'Etawah', pincode: '206001' },
  { id: 25, name: 'Farrukhabad', pincode: '209601' },
  { id: 26, name: 'Fatehpur', pincode: '212601' },
  { id: 27, name: 'Firozabad', pincode: '283203' },
  { id: 28, name: 'Gautam Buddha Nagar', pincode: '201301' },
  { id: 29, name: 'Ghaziabad', pincode: '201001' },
  { id: 30, name: 'Ghazipur', pincode: '233001' },
  { id: 31, name: 'Gonda', pincode: '271001' },
  { id: 32, name: 'Gorakhpur', pincode: '273001' },
  { id: 33, name: 'Hamirpur', pincode: '210701' },
  { id: 34, name: 'Hapur', pincode: '245101' },
  { id: 35, name: 'Hardoi', pincode: '241001' },
  { id: 36, name: 'Hathras', pincode: '204101' },
  { id: 37, name: 'Jalaun', pincode: '285101' },
  { id: 38, name: 'Jaunpur', pincode: '222001' },
  { id: 39, name: 'Jhansi', pincode: '284001' },
  { id: 40, name: 'Jyotiba Phule Nagar', pincode: '244401' },
  { id: 41, name: 'Kannauj', pincode: '209725' },
  { id: 42, name: 'Kanpur Dehat', pincode: '202404' },
  { id: 43, name: 'Kanpur Nagar', pincode: '208001' },
  { id: 44, name: 'Kasganj', pincode: '207123' },
  { id: 45, name: 'Kaushambi', pincode: '212201' },
  { id: 46, name: 'Kushinagar', pincode: '274301' },
  { id: 47, name: 'Lakhimpur Kheri', pincode: '262701' },
  { id: 48, name: 'Lalitpur', pincode: '284401' },
  { id: 49, name: 'Lucknow', pincode: '226001' },
  { id: 50, name: 'Maharajganj', pincode: '273304' },
  { id: 51, name: 'Mahoba', pincode: '284401' },
  { id: 52, name: 'Mainpuri', pincode: '205101' },
  { id: 53, name: 'Mathura', pincode: '281001' },
  { id: 54, name: 'Mau', pincode: '275101' },
  { id: 55, name: 'Meerut', pincode: '250001' },
  { id: 56, name: 'Mirzapur', pincode: '231001' },
  { id: 57, name: 'Moradabad', pincode: '244001' },
  { id: 58, name: 'Muzaffarnagar', pincode: '251001' },
  { id: 59, name: 'Pilibhit', pincode: '262001' },
  { id: 60, name: 'Pratapgarh', pincode: '230001' },
  { id: 61, name: 'Prayagraj', pincode: '211001' },
  { id: 62, name: 'Raebareli', pincode: '229001' },
  { id: 63, name: 'Rampur', pincode: '244901' },
  { id: 64, name: 'Saharanpur', pincode: '247001' },
  { id: 65, name: 'Sant Kabir Nagar', pincode: '272175' },
  { id: 66, name: 'Sant Ravidas Nagar', pincode: '273023' },
  { id: 67, name: 'Sambhal', pincode: '244302' },
  { id: 68, name: 'Shahjahanpur', pincode: '242001' },
  { id: 69, name: 'Shamli', pincode: '247776' },
  { id: 70, name: 'Shravasti', pincode: '271001' },
  { id: 71, name: 'Siddharthnagar', pincode: '272201' },
  { id: 72, name: 'Sitapur', pincode: '261001' },
  { id: 73, name: 'Sonbhadra', pincode: '231216' },
  { id: 74, name: 'Sultanpur', pincode: '228001' },
  { id: 75, name: 'Unnao', pincode: '209801' },
  { id: 76, name: 'Varanasi', pincode: '221001' }
];

// Historical data storage (in-memory for demo, use MongoDB in production)
const performanceData = {};

// Initialize performance data for each district
districtsDB.forEach(district => {
  performanceData[district.name] = generateHistoricalData();
});

// Generate mock historical data
function generateHistoricalData() {
  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  const history = [];
  
  for (let i = 0; i < 6; i++) {
    history.push({
      month: months[i],
      year: 2025,
      jobCardsIssued: Math.floor(Math.random() * 100000) + 40000,
      activeWorkers: Math.floor(Math.random() * 80000) + 25000,
      personDaysGenerated: Math.floor(Math.random() * 5000000) + 800000,
      householdsEmployed: Math.floor(Math.random() * 50000) + 8000,
      womenParticipation: Math.floor(Math.random() * 30) + 45,
      scParticipation: Math.floor(Math.random() * 30) + 10,
      stParticipation: Math.floor(Math.random() * 20) + 8,
      totalFundReleased: Math.floor(Math.random() * 100000000) + 15000000
    });
  }
  
  return {
    latestPerformance: history[history.length - 1],
    historicalData: history.slice(0, -1)
  };
}

// ============================================
// API ROUTES
// ============================================

// 1. GET all districts
app.get('/api/districts', (req, res) => {
  console.log('✅ GET /api/districts - Request received');
  res.json(districtsDB);
});

// 2. GET specific district
app.get('/api/districts/:id', (req, res) => {
  const { id } = req.params;
  console.log(`✅ GET /api/districts/${id} - Request received`);
  
  const district = districtsDB.find(d => d.id === parseInt(id) || d.name.toLowerCase() === id.toLowerCase());
  
  if (!district) {
    return res.status(404).json({ error: 'District not found' });
  }
  
  res.json(district);
});

// 3. GET performance data for a district (current + historical)
app.get('/api/performance/:districtName', (req, res) => {
  const { districtName } = req.params;
  console.log(`✅ GET /api/performance/${districtName} - Request received`);
  
  // Find district to verify it exists
  const district = districtsDB.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  
  if (!district) {
    return res.status(404).json({ error: 'District not found' });
  }
  
  // Get performance data
  const data = performanceData[district.name];
  
  if (!data) {
    return res.status(404).json({ error: 'Performance data not found' });
  }
  
  res.json({
    district: district,
    ...data
  });
});

// 4. GET performance for comparison (multiple districts on one metric)
app.get('/api/comparison/:metric', (req, res) => {
  const { metric } = req.params;
  const { districts } = req.query;
  
  console.log(`✅ GET /api/comparison/${metric} - Request received`);
  
  if (!districts) {
    return res.status(400).json({ error: 'districts query parameter required' });
  }
  
  const districtNames = districts.split(',');
  const results = [];
  
  districtNames.forEach(name => {
    const district = districtsDB.find(d => d.name.toLowerCase() === name.toLowerCase());
    if (district) {
      const data = performanceData[district.name];
      if (data) {
        results.push({
          district: district.name,
          value: data.latestPerformance[metric] || 0
        });
      }
    }
  });
  
  res.json(results);
});

// 5. GET historical trend for a district
app.get('/api/trend/:districtName', (req, res) => {
  const { districtName } = req.params;
  console.log(`✅ GET /api/trend/${districtName} - Request received`);
  
  const district = districtsDB.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  
  if (!district) {
    return res.status(404).json({ error: 'District not found' });
  }
  
  const data = performanceData[district.name];
  
  if (!data) {
    return res.status(404).json({ error: 'Performance data not found' });
  }
  
  res.json({
    district: district.name,
    trend: [data.latestPerformance, ...data.historicalData]
  });
});

// 6. Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: '🚀 MGNREGA Backend is running',
    districts_count: districtsDB.length,
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Server error' });
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(60));
  console.log('🚀 MGNREGA Backend Server');
  console.log('='.repeat(60));
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`📊 Districts loaded: ${districtsDB.length}`);
  console.log('');
  console.log('API Endpoints:');
  console.log(`  GET  /api/health              - Health check`);
  console.log(`  GET  /api/districts           - Get all 75 districts`);
  console.log(`  GET  /api/districts/:id       - Get specific district`);
  console.log(`  GET  /api/performance/:name   - Get district performance + history`);
  console.log(`  GET  /api/comparison/:metric  - Compare multiple districts`);
  console.log(`  GET  /api/trend/:name         - Get historical trend`);
  console.log('');
  console.log('='.repeat(60));
  console.log('');
});

module.exports = app;
