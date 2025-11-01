const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  month: String,
  year: Number,
  jobCardsIssued: Number,
  activeWorkers: Number,
  personDaysGenerated: Number,
  householdsEmployed: Number,
  womenParticipation: Number, // percentage
  scParticipation: Number, // percentage
  stParticipation: Number, // percentage
  completedWork: Number,
  ongoingWork: Number,
  totalFundReleased: Number,
});

const districtSchema = new mongoose.Schema({
  name: String,
  state: { type: String, default: 'Uttar Pradesh' },
  pincode: String,
  districtCode: String,
  latestPerformance: performanceSchema,
  historicalData: [performanceSchema],
  lastUpdated: { type: Date, default: Date.now },
  apiDataId: String // For tracking API updates
});

module.exports = mongoose.model('District', districtSchema);
