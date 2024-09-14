const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    attendees: [String],  // list of emails
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
