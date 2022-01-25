const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: { id: Number, text: String },
    sparse: true,
    required: true
  },
  category: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  genres: {
    type: [{ id: Number, text: String }],
    default: []
  },
  runtime: {
    type: Number,
    default: 0
  },
  release_date: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvirhd.com%2F&psig=AOvVaw3CVyB65VQnNBmXCJ4tv0G8&ust=1640208543021000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCK6pDr9fQCFQAAAAAdAAAAABAJ'
  }
}, {_id: false});


ContentSchema.methods.toJSON = function () {
  const { __v, _id, ...content } = this.toObject();
  return content;
}

const Contents = mongoose.model('Contents', ContentSchema);

module.exports = {
  Contents,
  ContentSchema
};
