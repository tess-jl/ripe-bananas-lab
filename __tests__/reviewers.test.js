require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');


describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

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
    const reviewers = await Reviewer.create([
      { name: 'name1', company: 'company1' },
      { name: 'name2', company: 'company2' },
      { name: 'name3', company: 'company3' },
    ]);
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual({
            _id: reviewer._id.toString(),
            id: expect.any(String),
            name: reviewer.name, 
            company: reviewer.company, 
            __v: 0
          });
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewerToGet = await Reviewer.create({    name: 'nameToFind', 
      company: 'company' 
    });
      
    return request(app)
      .get(`/api/v1/reviewers/${reviewerToGet.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewerToGet.id,
          id: expect.any(String),
          name: reviewerToGet.name, 
          company: reviewerToGet.company,
          reviews: [],
          __v: 0
        });
      });
  });

  it('updates a reviewer', async() => {
    const reviewer = await Reviewer.create({ 
      name: 'old name', 
      company: 'company name' 
    });
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'new reviewer name' })
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id.toString(),
          id: expect.any(String),
          name: 'new reviewer name', 
          company: reviewer.company, 
          __v: 0
        });
      });
  });

  //special test for deleting a reviewer ONLY if they have not written any reviews
  it('deletes a reviewer because they have written no reviews', async() => {
    const reviewerToDelete = await Reviewer.create({ 
      name: 'for deleting', 
      company: 'company name'                      
    });
    
    return request(app)
      .delete(`/api/v1/reviewers/${reviewerToDelete._id}/delete`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewerToDelete._id.toString(),
          id: expect.any(String),
          name: reviewerToDelete.name, 
          company: reviewerToDelete.company, 
          __v: 0
        });
      });
  });

  it('does not delete a reviewer because they have written a review', async() => {
    const reviewerToNotDelete = await Reviewer.create({ 
      name: 'not for deleting', 
      company: 'company name'                      
    });

    const studioForReview = await Studio.create({
      name: 'studioName'
    });

    const filmForReview = await Film.create({
      title: 'filmTitle', 
      studio: studioForReview._id,
      released: 1994
    });

    await Review.create({
      rating: 1, 
      reviewer: reviewerToNotDelete._id,
      review: 'eh', 
      film: filmForReview._id
    });
    
    return request(app)
      .delete(`/api/v1/reviewers/${reviewerToNotDelete._id}/delete`)
      .then(res => {
        expect(res.body).toEqual({
          message: 'This reviewer has reviews and cannot be deleted', 
          status: 500
        });
      });
  });

});
