const Review = require('./Review');

describe('tests for the Review model', () => {

  it('has a required rating field', () => {
    const review = new Review(); 
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has a required review field', () => {
    const review = new Review(); 
    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });

}); 
