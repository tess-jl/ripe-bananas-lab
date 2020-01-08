const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date, 
  pob: String
}, {
  toJSON: {
    virtuals: true
  }
});

//virtual for films property, because each actor has an array of films they are associated with 
schema.virtual('films', {
  ref: 'Film', 
  localField: '_id', 
  foreignField: 'actor'
});

module.exports = mongoose.model('Actor', schema);
