require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getFilm, getFilms, getStudio, getActor, getReview, getReviewer } = require('../lib/helpers/data-helpers');


describe('film routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();

    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'great title',
        studio: studio._id,
        released: 1994,
        cast: [
          { actor: actor._id }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          title: 'great title',
          studio: studio._id.toString(),
          released: 1994,
          cast: [{
            _id: expect.any(String), 
            actor: actor._id.toString() 
          }],
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          delete film.cast;
          expect(res.body).toContainEqual({ ...film, studio: expect.any(Object) });
        });
      });
  });

  // it('gets a film by id', () => {
  //   return request(app)
  //     .get(`/api/v1/films/${film._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: film._id.toString(),
  //         id: expect.any(String),
  //         title: film.title,
  //         released: film.released,
  //         studio: { 
  //           _id: studio._id.toString(),
  //           id: expect.any(String),
  //           name: studio.name
  //         },
  //         cast: [{
  //           _id: expect.any(String),
  //           role: film.cast[0].role,
  //           actor: {
  //             _id: film.cast[0].actor._id.toString(),
  //             id: expect.any(String),
  //             name: actor.name
  //           }
  //         }],
  //         reviews: [{
  //           _id: review._id.toString(),
  //           id: expect.any(String),
  //           rating: review.rating, 
  //           review: review.review,
  //           reviewer: {
  //             _id: reviewer._id.toString(), 
  //             id: reviewer.id,
  //             name: reviewer.name
  //           }
  //         }],
  //         __v: 0
  //       });
  //     });
  // });




});
