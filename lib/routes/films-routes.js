const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const Film = require("../models/film-model");

router
  .post("/", jsonParser, (req, res, next) => {
    const film = new Film(req.body);

    film.save().then(film => res.send(film)).catch(next);
  })
  .get("/", jsonParser, (req, res, next) => {
    Film.find().then(films => res.send(films)).catch(next);
  })
  .use(jsonParser);
module.exports = router;
