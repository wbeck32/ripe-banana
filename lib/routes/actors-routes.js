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
            .lean()
            .select('name -_id')
            .then(actors => res.send(actors))
            .catch(next);
        
        //TODO: get movieCount

        // Actor.find()
        //     .lean()
        //     .select('name') 
        //     .populate('moveCount')
        //     .exec(actor => {
        //         console.log()
        //         Film.count({ 'cast.actor': {$et: actor._id}});
        //     })
        //     .then(actors => res.send(actors))
        //     .catch(next);
            
    })

    .get('/:id', jsonParser, (req, res, next) => {
        Promise.all([
            Actor.findById(req.params.id).select('name dob pob -_id'),
            Film.find({ 'cast.actor': {$eq: req.params.id } }).select('title released -_id')
        ])
            .then(([actor, films]) => actor.films = films)
            .then(results => res.send(results))
            .catch(next);


            // .then(results => res.send(
            //     {
            //         name: results[0].name,
            //         dob: results[0].dob,
            //         pob: results[0].pob,
            //         films: results[1]
            //     }
            // ))
    })

    .delete('/:id', jsonParser, (req, res, next) => {
        //TODO: first check if actor in a film
        Film.find({ 'cast.actor': {$eq: req.params.id } })
            .then(found => {
                // do not delete actor if it's in movies
                if (!found) throw { code: 404, error: `${req.params.id} not found` };
                // ok to delete an actor that's not in a movie
                else Actor.findByIdAndRemove(req.params.id);
            })
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
