const mongoose = require('mongoose');

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
    unique: true
  },
  google: {
    type: Boolean,
    default: false
  },
  list: {
    type: [{
      tittle: String,
      comment: String,
      date: Date

    }],
    default: []
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = mongoose.model('User', UserSchema);