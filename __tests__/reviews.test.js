require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getReview, getReviews, getFilm, getReviewer } = require('../lib/helpers/data-helpers');


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

  // it('gets all reviewers', async() => {
  //   const reviewers = await Reviewer.create([
  //     { name: 'name1', company: 'company1' },
  //     { name: 'name2', company: 'company2' },
  //     { name: 'name3', company: 'company3' },
  //   ]);
  //   return request(app)
  //     .get('/api/v1/reviewers')
  //     .then(res => {
  //       reviewers.forEach(reviewer => {
  //         expect(res.body).toContainEqual({
  //           _id: reviewer._id.toString(),
  //           id: expect.any(String),
  //           name: reviewer.name, 
  //           company: reviewer.company, 
  //           __v: 0
  //         });
  //       });
  //     });
  // });

  it('deletes a review', async() => {
    const reviewToDelete = await getReview();
  
    return request(app)
      .delete(`/api/v1/reviews/${reviewToDelete._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewToDelete);
      });
  });

});
