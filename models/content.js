const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    default: 0
  },
  comment: {
    type: String,
    default: ''
  },
  date_watched: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', ContentSchema);
