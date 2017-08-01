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

        //TODO: christy still working on this
        
        // let actorsList = null;

        // Actor.find()
        //     .select('name')
        //     .lean()
        //     .then(actors => {
        //         actorsList = actors;

        //         return Promise.all(
        //             actors.map(actor => {
        //                 Film.find({ 'cast.actor': { $eq: actor._id } });
        //             })
        //         )
        //             .then(films => films.map(film => film.length))
        //             .then(filmCounts => {
        //                 // actorsList.forEach(actor => {
        //                 //     actor.name = name,
        //                 //     actor.movieCount = filmCounts[]
        //                 // });
        //                 return filmCounts;
        //             });
        //     })
        //     .then(actorsAndCountOfMovies => res.send(actorsAndCountOfMovies))
        //     .catch(next);
            


                // actors.forEach(a => {
                //     Film.find( { 'cast.actor': { $eq: a.id } })
                //         .then(films => {
                //             console.log('films >>>>', films);
                //             a.movieCount = films.length;
                            
                //             console.log('actor >>>>>>>', a.name, a.movieCount);
                //         });
                // });
            //     return actors;
            // })
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
