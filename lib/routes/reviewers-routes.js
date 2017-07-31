const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Reviewer = require('../models/reviewer-model');

router

    .use(jsonParser)

    .post('/', (req, res, next) => {
        const reviewer = new Reviewer(req.body);
        reviewer
            .save()
            .then( reviewer => res.send(reviewer))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.find()
            .lean()
            .select('name company')
            .then( reviewers => res.send(reviewers))
            .catch(next);

    })

module.exports = router;