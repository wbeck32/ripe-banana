const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Film = require('../models/film-model');
const Reviewer = require('../models/reviewer-model');
const Review = require('../models/review-model');
const Actor = require('../models/actor-model');

router
  .get('/', jsonParser, (req, res, next) => {
    // [{ title, released, studio.name, averageRating }]
    Film.aggregate([
      {
        $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studiomatch'
        }
      },

      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'film',
          as: 'filmreviews'
        }
      },

      {
        $project: {
          title: 1,
          released: 1,
          studioName: { $arrayElemAt: ['$studiomatch.name', 0] },
          averageRatings: { $avg: '$filmreviews.rating' }
        }
      }
    ])
      .then(films => {
        return res.send(films);
      })
      .catch(next);
  })
  .get('/top', jsonParser, (req, res, next) => {
    //   [{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
    Film.aggregate([
      {
        $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studiomatch'
        }
      },

      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'film',
          as: 'filmreviews'
        }
      },

      {
        $project: {
          title: 1,
          released: 1,
          studioName: { $arrayElemAt: ['$studiomatch.name', 0] },
          averageRating: { $avg: '$filmreviews.rating' }
        }
      },

      {
        $sort: {
          averageRating: -1
        }
      }
    ])
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/actors', jsonParser, (req, res, next) => {
    // [{ name, movieCount }]
    Actor.aggregate([
      {
        $lookup: {
          from: 'films',
          localField: '_id',
          foreignField: 'cast.actor',
          as: 'act'
        }
      },

      {
        $project: { name: 1, numberOfFilms: { $size: '$act' } }
      }
    ])
      .then(results => {
        return res.send(results);
      })
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
        .then(results => {
          // return res.send(results.body)
        })
        .catch(next);
  });

module.exports = router;

// route	data
// GET /films	[{ title, released, studio.name, averageRating }]
// GET /films/top	[{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
// GET /actors	[{ name, movieCount }]
// GET /reviewer	[{ name, company, countOfReviews, averageReview }]
