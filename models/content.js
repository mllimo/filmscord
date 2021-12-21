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
  },
  cover: {
    type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvirhd.com%2F&psig=AOvVaw3CVyB65VQnNBmXCJ4tv0G8&ust=1640208543021000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCK6pDr9fQCFQAAAAAdAAAAABAJ'
  }
});

module.exports = mongoose.model('User', ContentSchema);
