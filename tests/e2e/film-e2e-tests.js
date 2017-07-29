const app = require("../../lib/app");
const chai = require("chai");
const { assert } = chai.assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

process.env.MONGODB_URI = "mongodb://localhost:27017/ripe-banana-test";
require("../../lib/connect");
const connection = require("mongoose").connection;

const dbHelper = require("../db-helper");
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
  beforeEach(() => dbHelper.dropColl("film"));

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
    released: "1997",
    cast: {
      role: "Mayor of Mystery",
      actor: testActor._id
    }
  });

  function save(testFilm) {
    console.log("2: ", testFilm);
    return req.post("/films").send(testFilm).then(({ body }) => {
      console.log("3: ");
      return body;
    });
  }

  it.only("POST /film", () => {
    console.log("1");
    return save(testFilm).then(savedFilm => {
      console.log("4: ", savedFilm);
    });
  }), it("GET /films", () => {
    return req.get("/", () => {}).then(res => {}).catch(err => {});
  }), it("GET /films by id", () => {
    //     return Promise(film  => {
    //   return save(film);
    // })
    const filmToGet = 1;
    return req
      .get("/films/:id", () => {})
      .send({
        id: filmToGet._id
      })
      .then(res => {})
      .catch(err => {});
  });
});
