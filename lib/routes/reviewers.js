const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

// .get('/:id', (req, res, next) => {
//   Reviewer
//     .findById(req.params.id)
//     .populate('films', 'title')
//     .then(studio => res.send(studio))
//     .catch(next);
// })

  .put('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .update()
      .populate('films', 'title')
      .then(studio => res.send(studio))
      .catch(next);
  });

