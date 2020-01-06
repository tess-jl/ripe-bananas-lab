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
    type: Date, 
    required: true
  },
  //getting all the actors for one film
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true
  }
});


module.exports = mongoose.model('Film', schema);
