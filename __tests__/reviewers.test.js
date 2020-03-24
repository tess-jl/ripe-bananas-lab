require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getReviewer, getReviewers, getReview } = require('../lib/helpers/data-helpers');
const Review = require('../lib/models/Review');


describe('reviewer routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'reviewer name',
        company: 'company name'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'reviewer name',
          company: 'company name',
          __v: 0
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual(reviewer);
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
      
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...reviewer, reviews: expect.any(Object) });
      });
  });

  it('updates a reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'new reviewer name' })
      .then(res => {
        expect(res.body).toEqual({...reviewer, name: 'new reviewer name' });
      });
  });

  //special test for deleting a reviewer ONLY if they have not written any reviews
  it('deletes a reviewer because they have written no reviews', async() => {
    const reviewerWithNoReviews = await getReviewer();
    //delete all reviews by that reviewer
    await Review.deleteMany({ reviewer: reviewerWithNoReviews._id });
    
    return request(app)
      .delete(`/api/v1/reviewers/${reviewerWithNoReviews._id}/delete`)
      .then(res => {
        expect(res.body).toEqual(reviewerWithNoReviews);
      });
  });

  it('does not delete a reviewer because they have written a review', async() => {
    //find a review
    const review = await getReview();
    //look up reviewer that made that review, therefore reviewer used in test for sure has a review
    const reviewerWithReview = await getReviewer({ _id: review.reviewer });
    
    return request(app)
      .delete(`/api/v1/reviewers/${reviewerWithReview ._id}/delete`)
      .then(res => {
        expect(res.body).toEqual({
          message: 'This reviewer has reviews and cannot be deleted', 
          status: 500
        });
      });
  });

});
