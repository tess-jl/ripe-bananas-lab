require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getReview, getFilm, getReviewer } = require('../lib/helpers/data-helpers');
const chance = require('chance').Chance();
const Review = require('../lib/models/Review');


describe('reviewer routes', () => {
  it('creates a review', async() => {
    const testFilm = await getFilm();
    const testReviewer = await getReviewer();

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 1, 
        reviewer: testReviewer._id, 
        review: 'its ok', 
        film: testFilm._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          rating: 1, 
          reviewer: testReviewer._id.toString(), 
          review: 'its ok', 
          film: testFilm._id.toString(),
          __v: 0
        });
      });
  });

  it('gets a limit of 100 reviews when there are more than 100 reviews', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    await Review.create([...Array(101)].map(() => ({
      rating: 1, 
      reviewer: reviewer._id, 
      review: chance.string({ length: 140 }),
      film: film._id
    })));

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  it('deletes a review', async() => {
    const reviewToDelete = await getReview();
  
    return request(app)
      .delete(`/api/v1/reviews/${reviewToDelete._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewToDelete);
      });
  });

});
