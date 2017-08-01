const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Studio = require('../models/studio-model');

router
    .post('/', jsonParser, (req, res, next) => {
        const studio = new Studio(req.body);

        studio.save()
            .then(studio => res.send(studio))
            .catch(next);
    })
	
    .get('/', jsonParser, (req, res, next) => {
        Studio.find()
            .then(studios => res.send(studios))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        Studio.update(
            { _id: req.params.id },
            { $set: req.body}, {
                new: true,
                multi: false,
                runValidators: true
            })
            .lean()
            .then( response => {
                res.send({ modified: response.nModified === 1 });
            })
            .catch(next);
    });

module.exports = router;
