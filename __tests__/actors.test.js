require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Actor = require('../lib/models/Actor');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'natalie portman',
        dob: Date.now()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'natalie portman',
          dob: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await Actor.create([
      { name: 'carrie fisher' },
      { name: 'daisey ridley' }
    ]);
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id.toString(),
            id: expect.any(String),
            name: actor.name
          });
        });
      });
  });

  it('gets an actor by id', async() => {
    const testActor = await Actor.create({
      name: 'actor name'
    }); 

    return request(app)
      .get(`/api/v1/actors/${testActor.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: testActor.id,
          id: expect.any(String),
          name: testActor.name, 
          films: [],
          __v: 0
        });
      });
  });


});
