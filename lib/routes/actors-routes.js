const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Actor = require('../models/actor-model');

router
    .post('/', jsonParser, (req, res, next) => {
        const actor = new Actor(req.body);

        actor.save()
            .then(actor => res.send(actor))
            .catch(next);
    })

    // GET /actors	[{ name, movieCount }]
    .get('/', jsonParser, (req, res, next) => {
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    // GET /actors/:id	{ name, dob, pob, films: [ name, released ] }
    .get('/:id', jsonParser, (req, res, next) => {
        Actor.findById(req.params.id)
            .lean()
            .select('name dob pob')
            .populate({
                path: 'film',
                select: 'title released'
            })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .use(jsonParser);

module.exports = router;
