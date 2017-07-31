const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Review = require('../models/review-model');

router

    .use(jsonParser)

    .post('/', (req, res, next) => {
        const review = new Review(req.body);
        review
            .save()
            .then( review => res.send(review))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Review.update (
            { _id: req.params.id },
            { $set: req.body }, {
                new: true,
                multi: false,
                runValidators: true
            })
            .lean()
            .then( response => {
                res.send( { modified: response.nModified === 1 });
            })
            .catch(next);
    });

module.exports = router;