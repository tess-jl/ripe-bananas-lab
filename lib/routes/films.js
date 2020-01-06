const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  });

  // .get('/', (req, res, next) => {
  //   Film
  //     .find()
  //     .select({ name: true })
  //     .then(actors => res.send(actors))
  //     .catch(next);
  // });

// .get('/:id', (req, res, next) => {
//   Actor
//     .findById(req.params.id)
//     .then(studio => res.send(studio))
//     .catch(next);
// });
