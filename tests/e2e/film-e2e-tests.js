const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

process.env.MONGODB_URI = "mongodb://localhost:27017/ripe-banana-test";
require("../../lib/connect");
const connection = require("mongoose")
    .connection;

const Film = require("../../lib/models/film-model");
const Studio = require("../../lib/models/studio-model");
const Actor = require("../../lib/models/actor-model");

// `GET /films` | [{ title, released, studio.name }]
// `GET /films/:id` | { title, released, studio.name, cast: [ { role, actor-name } ], reviews: [rating, review, reviewer.name] }
// POST
// PATCH
// DELETE

describe.only("film e2e tests", () => {
    const req = chai.request(app);
    before(() => connection);
    beforeEach(() => {
        let testStudio,
            testActor,
            testFilm,
            testFilms = null;
        connection.dropDatabase();
    });

    const testStudio = new Studio({
        name: "Studio Fantastico",
        address: {
            city: "Krakow",
            state: "",
            country: "Poland"
        }
    });

    const testActor = new Actor({
        name: "Noodly McNoodleface",
        dob: new Date("1987", "11", "11"),
        pob: "Exeter, New Hampshire"
    });

    const testFilm = new Film({
        title: "The Greatest Film Ever",
        studio: testStudio._id,
        released: 1997,
        cast: {
            role: "Mayor of Mystery",
            actor: testActor._id
        }
    });

    let testFilms = [{
            title: "The Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        },
        {
            title: "The Second Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        },
        {
            title: "The Third Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        }
    ];


    function save(testFilm) {
        return req.post("/films")
            .send(testFilm)
            .then(({ body }) => {
                testFilm.__v = body.__v;
                testFilm._id = body._id;
                testFilm.cast = body.cast;
                testFilm.studio = body.studio;
                return testFilm;
            });
    }

    it.only("POST /film", () => {
            return save(testFilm)
                .then(savedFilm => {
                    assert.equal(testFilm.released, savedFilm.released);
                    assert.deepEqual(testFilm, savedFilm);
                });
        }), it.only("GET /films", () => {
            return Promise.all(testFilms.map(save))
                .then(saved => {
                    testFilms = saved
                    return req.get("/films")
                        .then((films => {
                            assert.equal(3, films.body.length);
                            assert.deepEqual(films.body, testFilms);
                        }))
                })
        }), it.only("GET /films by id", () => {
            let filmId = null;
            return save(testFilm)
                .then(savedFilm => {
                    filmId = '_' + savedFilm._id
                    return req.get("/films")
                        .query({ id: filmId })
                        .then(res => {
                            assert.equal(res.body[0]._id, savedFilm._id);
                        })
                })
        }),
        it.skip("POST /films", () => {

        }),
        it.skip("DELETE /films", () => {

        }),
        it.skip("PATCH /films", () => {

        })
});