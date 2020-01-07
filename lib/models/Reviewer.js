const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
});

schema.statics.findByIdAndDeleteIfNoReviews = function(id) {
  return this 
    .findById(id)
    .populate('reviews')
    .then(reviewer => {
      if(reviewer.reviews.length === 0) {
        return this.findByIdAndDelete(id);
      }
      return 'This reviewer has written reviews and, therefore, cannot be deleted';
    });
};


schema.virtual('reviews', {
  ref: 'Review', 
  localField: '_reviewId', 
  foreignField: 'reviewer'
});

module.exports = mongoose.model('Reviewer', schema);
