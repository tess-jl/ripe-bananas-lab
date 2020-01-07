require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');


describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let testReview; 
  let testReviewer;
  let testStudio;
  let testFilm;
  beforeEach(async() => {
    testReviewer = await Reviewer.create({
      name: 'test reviewer', 
      company: 'companyName'
    });
    testStudio = await Studio.create({
      name: 'studioName'
    });
    testFilm = await Film.create({
      title: 'filmTitle', 
      studio: testStudio._id, 
      released: 2019
    });
    testReview = await Review.create({
      rating: 1, 
      reviewer: testReviewer._id, 
      review: 'its ok', 
      film: testFilm._id
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a review', () => {
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


  // it('gets a studio by id', async() => {
  //   const maineStudio = await Studio.create({ 
  //     name: 'awesome maine studio', 
  //     address: {
  //       country: 'USA'
  //     } 
  //   });
      
  //   return request(app)
  //     .get(`/api/v1/studios/${maineStudio.id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: maineStudio.id,
  //         id: expect.any(String),
  //         name: maineStudio.name, 
  //         address: maineStudio.address,
  //         films: [],
  //         __v: 0
  //       });
  //     });
  // });

  // it('deletes a review', async() => {
  //   const reviewerToDelete = await Review.create({ 
  //     name: 'for deleting', 
  //     company: 'company name' 
  //   });
  //   return request(app)
  //     .delete(`/api/v1/reviewers/${reviewerToDelete._id}`)
  //     .send({ name: 'new reviewer name' })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: reviewerToDelete._id.toString(),
  //         id: expect.any(String),
  //         name: reviewerToDelete.name, 
  //         company: reviewerToDelete.company, 
  //         __v: 0
  //       });
  //     });
  // });

});
