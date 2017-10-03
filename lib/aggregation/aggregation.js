const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Film = require('../models/film-model');
const Reviewer = require('../models/reviewer-model');
const Review = require('../models/review-model');
const Actor = require('../models/actor-model');

router
  .get('/films', jsonParser, (req, res, next) => {
    // [{ title, released, studio.name, averageRating }]
    Film.find()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/films/top', jsonParser, (req, res, next) => {
    //   [{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
    Film.find()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/actors', jsonParser, (req, res, next) => {
    // [{ name, movieCount }]
    Actor.find()
      .select('name')
      .then(actors => res.send(actors))
      .catch(next);
  })
  .get('/reviewers', (req, res, next) => {
    // [{ name, company, countOfReviews, averageReview }]
    Reviewer.findById(req.params.id).lean(),
      Review.find({ reviewer: req.params.id })
        .select('film rating review')
        .populate({
          path: 'film',
          select: 'title'
        })
        .then(results => {})
        .catch(next);
  });

module.exports = router;

// route	data
// GET /films	[{ title, released, studio.name, averageRating }]
// GET /films/top	[{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
// GET /actors	[{ name, movieCount }]
// GET /reviewer	[{ name, company, countOfReviews, averageReview }]
