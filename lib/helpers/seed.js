const chance = require('chance').Chance();

const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');


module.exports = async({ numActors = 5, numFilms = 5, numReviews = 5, numReviewers = 5, numStudios = 5 } = {}) => {
  const studios = await Studio.create([...Array(numStudios)].map(() => ({
    name: chance.name()
  })));

  const actors = await Actor.create([...Array(numActors)].map(() => ({
    name: chance.name,
  })));

  const films = await Film.create([...Array(numFilms)].map(() => ({
    title: chance.word(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1880, max: 9999 }), 
    cast: [{ 
      role: chance.word(), 
      actor: chance.pickone(actors.map(actor => actor._id))
    }]
  })));

  const reviewers = await Reviewer.create([...Array(numReviewers)].map(() => ({
    name: chance.name(), 
    company: chance.name()
  })));

  await Review.create([...Array(numReviews)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }), 
    review: chance.string({ length: 140 }), 
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    film: chance.pickone(films.map(film => film._id))
  })));
};
