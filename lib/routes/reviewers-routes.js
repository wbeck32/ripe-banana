const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Reviewer = require('../models/reviewer-model');
const Review = require('../models/review-model');

router

    .use(jsonParser)

    .post('/', (req, res, next) => {
        const reviewer = new Reviewer(req.body);
        reviewer
            .save()
            .then( reviewer => res.send(reviewer))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Promise.all([
            Reviewer.findById(req.params.id).lean(),
            Review.find({ reviewer: req.params.id })
                .lean()
                .select('film rating review')
                .populate({
                    path: 'film',
                    select: 'title'
                })
        ])
            .then(reviewerInfo => {
                if (!reviewerInfo[0]) next();
                else {
                    let reviewer = reviewerInfo[0];
                    reviewer.reviews = reviewerInfo[1];
                    return res.send(reviewer);
                }
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.find()
            .lean()
            .select('name company')
            .then( reviewers => res.send(reviewers))
            .catch(next);

    })

    .put('/:id', (req, res, next) => {
        Reviewer.update(
            { _id: req.params.id },
            { $set: req.body}, { 
                new: true, 
                multi: false,
                runValidators: true
            })
            .lean()
            .then(response => {
                res.send({ modified: response.nModified === 1 });
            })
            .catch(next);
    });

module.exports = router;