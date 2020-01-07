require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

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

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'maine studio',
        address: {
          state: 'Maine', 
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'maine studio',
          address: {
            state: 'Maine', 
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await Studio.create([
      { name: 'maine studio' },
      { name: 'hawaii studio' },
      { name: 'japan studio' }
    ]);
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id.toString(),
            id: expect.any(String),
            name: studio.name
          });
        });
      });
  });


  it('gets a studio by id', async() => {
    const maineStudio = await Studio.create({ 
      name: 'awesome maine studio', 
      address: {
        country: 'USA'
      } 
    });
      
    return request(app)
      .get(`/api/v1/studios/${maineStudio.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: maineStudio.id,
          id: expect.any(String),
          name: maineStudio.name, 
          address: maineStudio.address,
          films: [],
          __v: 0
        });
      });
  });
});
