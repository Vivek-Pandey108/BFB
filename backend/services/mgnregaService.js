const axios = require('axios');
const District = require('../models/District');

class MgnregaService {
  
  async fetchDistrictData(districtName) {
    try {
      // Since direct API endpoint is limited, we cache data locally
      // This is a fallback that stores mock data for demonstration
      console.log(`Fetching data for ${districtName}`);
      
      // In production, you would fetch from:
      // https://nregastrep.nic.in/netnrega or https://data.gov.in APIs
      
      return await this.getMockData(districtName);
    } catch (error) {
      console.error('Error fetching MGNREGA data:', error);
      throw error;
    }
  }

  async getMockData(districtName) {
    // Returns realistic MGNREGA metrics
    return {
      jobCardsIssued: Math.floor(Math.random() * 100000) + 50000,
      activeWorkers: Math.floor(Math.random() * 80000) + 30000,
      personDaysGenerated: Math.floor(Math.random() * 5000000) + 1000000,
      householdsEmployed: Math.floor(Math.random() * 50000) + 10000,
      womenParticipation: Math.floor(Math.random() * 30) + 50,
      scParticipation: Math.floor(Math.random() * 30) + 15,
      stParticipation: Math.floor(Math.random() * 20) + 10,
      totalFundReleased: Math.floor(Math.random() * 100000000) + 20000000,
    };
  }

  async getAllDistrictData() {
    try {
      const districts = await District.find({ state: 'Uttar Pradesh' });
      return districts;
    } catch (error) {
      console.error('Error fetching all districts:', error);
      throw error;
    }
  }

  async updateDistrictPerformance(districtName, performanceData) {
    try {
      const district = await District.findOne({ name: districtName });
      
      if (!district) {
        throw new Error('District not found');
      }

      // Archive old performance data
      if (district.latestPerformance) {
        district.historicalData.push(district.latestPerformance);
      }

      district.latestPerformance = {
        ...performanceData,
        month: new Date().toLocaleString('en-US', { month: 'long' }),
        year: new Date().getFullYear()
      };
      district.lastUpdated = new Date();

      await district.save();
      return district;
    } catch (error) {
      console.error('Error updating district performance:', error);
      throw error;
    }
  }
}

module.exports = new MgnregaService();
