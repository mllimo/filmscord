const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ContentSchema } = require('./content');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  google: {
    type: Boolean,
    default: false
  },
  contents: {

    type: [{
      info: {
        type: ContentSchema,
        sparse: true,
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
    }],
    _id: false
  }
});


UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return user;
}

const Users = mongoose.model('User', UserSchema);


module.exports = {
  Users,
  UserSchema
};