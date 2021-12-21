const mongoose = require('mongoose');
const Content = require('./content');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  google: {
    type: Boolean,
    default: false
  },
  list: {
    type: [Content],
    default: []
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = mongoose.model('User', UserSchema);