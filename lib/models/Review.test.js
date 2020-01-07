const Review = require('./Review');

describe('tests for the Review model', () => {

  describe('tests for rating field', () => {
    it('has a required rating field', () => {
      const review = new Review(); 
      const { errors } = review.validateSync();
  
      expect(errors.rating.message).toEqual('Path `rating` is required.');
    });

    it('has a rating greater than 1', () => {
      const review = new Review({ rating: 0 }); 
      const { errors } = review.validateSync();
  
      expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
    });

    it('has a rating less than or equal to 5', () => {
      const review = new Review({ rating: 6 }); 
      const { errors } = review.validateSync();
  
      expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
    });
  });

  it('has a required reviewer field', () => {
    const review = new Review(); 
    const { errors } = review.validateSync();

    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
  });


  describe('tests for review field', () => {
    it('has a required review field', () => {
      const review = new Review(); 
      const { errors } = review.validateSync();
  
      expect(errors.review.message).toEqual('Path `review` is required.');
    });
  
    it('has a review less than 140 characters', () => {
      const review = new Review({ review: 'x'.repeat(141) }); 
      const { errors } = review.validateSync();
  
      expect(errors.review.message).toEqual('Path `review` (`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`) is longer than the maximum allowed length (140).');
    });
  });

  it('has a required film field', () => {
    const review = new Review(); 
    const { errors } = review.validateSync();

    expect(errors.film.message).toEqual('Path `film` is required.');
  });

}); 
