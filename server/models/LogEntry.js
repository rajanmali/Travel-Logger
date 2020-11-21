const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = { type: Number, required: true };

const logEntrySchema = new Schema(
  {
    title: { type: String, required: true },
    image: String,
    description: String,
    comments: String,
    rating: { type: Number, min: 0, max: 10, default: 0 },
    latitude: { ...requiredNumber, min: -90, max: 90 },
    longitude: { ...requiredNumber, min: -180, max: 180 },
    visitDate: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
