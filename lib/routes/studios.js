const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios));
  });

