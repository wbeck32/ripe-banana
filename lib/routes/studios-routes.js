const express = require("express");
const router = express.Router();
const jsonParser = require("body-parser").json();
const Studio = require("../models/studio-model");

router
    .post("/",jsonParser, (req, res, next)=>{
        const studio = new Studio(req.body);

        studio.save()
        .then(studio, () => res.send(studio)
        .catch(next))

        })
    .get("/", jsonParser,(req, res, next)=>{
        Studio.find()
        .then(studios,()=>{res.send(studios)})
    })

        .use(jsonParser);
    module.exports = router;