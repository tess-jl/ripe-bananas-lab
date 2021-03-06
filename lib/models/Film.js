const mongoose = require('mongoose');

//cast HAS to be a separate schema because you have many cast members so they need to be in an array 
const castSchema = new mongoose.Schema({
  role: String, 
  //actor field is referenced in the virtual on 
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor', 
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio', 
    required: true
  },
  released: {
    type: Number, 
    required: true, 
    min: 1880, 
    max: 9999
  },
  //getting all the actors for one film
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true
  }
});


schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film'
});


module.exports = mongoose.model('Film', schema);
