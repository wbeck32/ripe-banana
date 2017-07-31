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

    //TODO: GET /actors	[{ name, movieCount }]
    .get('/', jsonParser, (req, res, next) => {
        Actor.find()
            .lean()
            // .populate(
            //     path: 'films',
            //     select:

            // )
            .select('name') // films')
            .then(actors => res.send(actors))
            .catch(next);
    })

    //TODO: GET /actors/:id	{ name, dob, pob, films: [ name, released ] }
    .get('/:id', jsonParser, (req, res, next) => {
        Actor.findById(req.params.id)
            // .lean()
            // .populate({
            //     path: 'films',
            //     select: 'title released'
            // })
            // .select('name dob pob')
            .then(actor => res.send(actor))
            .catch(next);
    })

    .delete('/:id', jsonParser, (req, res, next) => {
        Actor.findByIdAndRemove(req.params.id)
            .then(response => res.send({ removed: !!response }))
            .catch(next);
    })

    .patch('/:id', jsonParser, (req, res, next) => {
        Actor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .use(jsonParser);

module.exports = router;
