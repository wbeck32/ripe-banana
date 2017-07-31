const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Actor = require('../models/actor-model');
const Film = require('../models/film-model');

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
        // Actor.findById(req.params.id)
        //     .then(actor => res.send(actor))
        //     .catch(next);

        Promise.all([
            Actor.findById(req.params.id).select('name dob pob -_id'),
            Film.find({ 'cast.actor': {$gte: req.params.id } }).select('title released -_id')
        ])
            .then(results => res.send(
                {
                    name: results[0].name,
                    dob: results[0].dob,
                    pob: results[0].pob,
                    films: results[1]
                }
            ))
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
