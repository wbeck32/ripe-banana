const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const testData = require("../testdata/films-test-data");

process.env.MONGODB_URI = "mongodb://localhost:27017/ripe-banana-test";
require("../../lib/connect");
const connection = require("mongoose").connection;
const jsonParser = require("body-parser")
    .json();

// `GET /films` | [{ title, released, studio.name }]
// `GET /films/:id` | { title, released, studio.name, cast: [ { role, actor-name } ], reviews: [rating, review, reviewer.name] }
// POST
// PATCH
// DELETE

describe.skip("film e2e tests", () => {
  const req = chai.request(app);
  before(() => connection);
  beforeEach(() => {
    let testStudio,
      testActor,
      testFilm,
      testFilms = null;
    connection.dropDatabase();
  });

  const testFilm = testData.testFilm;

  function save(testFilm) {
    console.log("2: ", testFilm);
    return req.post("/films")
    .send(testFilm)
    .then(({ body }) => {
      console.log("3: ", body);
      testFilm.__v = body.__v;
      testFilm._id = body._id;
      testFilm.cast = body.cast;
      testFilm.studio = body.studio;
      return testFilm;
    });
  }

  it.only("POST /film", () => {
    return save(testFilm).then(savedFilm => {
      console.log("4: ", savedFilm);
      assert.equal(testFilm.released, savedFilm.released);
      assert.deepEqual(testFilm, savedFilm);
    });
  }), it("GET /films", () => {
    return Promise.all(testData.testFilms.map(save)).then(saved => {
      testFilms = saved;
      return req.get("/films").then(films => {
        assert.equal(3, films.body.length);
        assert.deepEqual(films.body, testFilms);
      });
    });
  }), it("GET /films by id", () => {
    let filmId = null;
    return save(testFilm).then(savedFilm => {
      filmId = "_" + savedFilm._id;
      return req.get("/films").query({ id: filmId }).then(res => {
        assert.equal(res.body[0]._id, savedFilm._id);
      });
    });
  }), it.skip(
    "POST /films",
    () => {}
  ), it.skip("DELETE /films", () => {}), it.skip("PATCH /films", () => {});
});
