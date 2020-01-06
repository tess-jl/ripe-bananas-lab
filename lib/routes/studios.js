const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio));
  })
  
  .get('/', (req, res) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios));
  });

