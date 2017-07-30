const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser")
    .json();
const mongoose = require("mongoose");
const Film = require("../models/film-model");
router
    .post("/", jsonParser, (req, res, next) => {
        const film = new Film(req.body);
        film.save()
            .then((film => res.send(film)))
    })
    .get("/", jsonParser, (req, res, next) => {
        Film.find()
            .then(films => res.send(films))
            .catch(next);
    })
    .delete("/", jsonParser, (req, res, next) => {
        Film.findOneAndRemove(req.query.id)
            .then(status => res.send(status))
            .catch(next);
    })
    .patch("/", jsonParser, (req, res, next) => {
        Film.findByIdAndUpdate(req.body.id, { title: req.body.newTitle }, { new: true, runValidators: true })
            .then(doc => res.send(doc))
            .catch(next);
    })
    .use(jsonParser);
module.exports = router;