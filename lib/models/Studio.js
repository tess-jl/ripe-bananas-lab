const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String,
    country: String
  }
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Studio', schema);
