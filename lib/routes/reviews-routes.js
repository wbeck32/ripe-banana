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

module.exports = router;