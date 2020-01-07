const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ cast: false })
      .populate('studio', 'name')
      .then(films => res.send(films))
      .catch(next);
  });

  // .get('/:id', (req, res, next) => {
  //   Film
  //     .findById(req.params.id)
  //     .then(studio => res.send(studio))
  //     .catch(next);
  // });
