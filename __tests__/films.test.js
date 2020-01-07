require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  let studio;
  let actor;
  beforeEach(async() => {

    studio = await Studio
      .create({
        name: 'best studio',
      });

    actor = await Actor
      .create({
        name: 'natalie portman'
      });

    film = await Film
      .create({
        title: 'great title',
        studio: studio._id,
        released: 1994,
        cast: [
          { actor: actor._id }
        ]
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates an event', () => {
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
          released: expect.any(Number),
          cast: [{
            _id: expect.any(String), 
            actor: actor._id.toString() 
          }],
          __v: 0
        });
      });
  });
});

