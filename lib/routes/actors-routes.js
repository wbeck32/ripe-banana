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

    .get('/', jsonParser, (req, res, next) => {
        Actor.find()
            .select('name')
            .lean()
            .then(actors => {
                return Promise.all(
                    actors.map(a => {
                        return Film.find({ 'cast.actor': { $eq: a._id } })
                            .then(films => {
                                a.movieCount = films.length;
                                return a;
                            });
                    })
                );
            })
            .then(actors => {
                let newArray = [];
                actors.map(a => {
                    newArray.push({ name: a.name, movieCount: a.movieCount });
                });
                return newArray;
            })
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/:id', jsonParser, (req, res, next) => {
        Promise.all([
            Actor.findById(req.params.id).select('name dob pob -_id'),
            Film.find({ 'cast.actor': { $eq: req.params.id } }).select('title released -_id')
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
        Film.findOne({ 'cast.actor': {$eq: req.params.id } })
            .then(found => {
                if (found === null) return Actor.findByIdAndRemove(req.params.id); 
            }) 
            .then(status => res.send({ removed: !!status }))
            .catch(next);
    })

    .patch('/:id', jsonParser, (req, res, next) => {
        Actor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(actor => res.send(actor))
            .catch(next);
    })

    .use(jsonParser);

module.exports = router;
