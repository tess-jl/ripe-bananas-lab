require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getStudio, getStudios } = require('../lib/helpers/data-helpers');


describe('app routes', () => {
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
    const studios = await getStudios();
    
    
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          delete studio.__v;
          expect(res.body).toContainEqual(studio);
        });
      });
  });


  // it('gets a studio by id', async() => {
  //   const maineStudio = await Studio.create({ 
  //     name: 'awesome maine studio', 
  //     address: {
  //       country: 'USA'
  //     } 
  //   });

  //   const maineFilm = await Film.create({ 
  //     title: 'awesome maine film', 
  //     studio: maineStudio._id,
  //     released: 1994, 
  //     cast: []
  //   });
      
  //   return request(app)
  //     .get(`/api/v1/studios/${maineStudio.id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         id: expect.any(String),
  //         name: maineStudio.name, 
  //         address: maineStudio.address,
  //         films: [{
  //           _id: maineFilm._id.toString(),
  //           id: expect.any(String),
  //           title: maineFilm.title
  //         }],
  //         __v: 0
  //       });
  //     });
  // });
});
