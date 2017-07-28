const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const mongoose = require("../../lib/connect");
const connection = require("mongoose").connection;
const connect = require("mongoose").connect;
const dbHelper = require("../db-helper");

chai.use(chaiHttp);

// `GET /films` | [{ title, released, studio.name }]
// `GET /films/:id` | { title, released, studio.name, cast: [ { role, actor-name } ], reviews: [rating, review, reviewer.name] }
// POST
// PATCH
// DELETE

describe.only("film e2e tests", () => {
  const req = chai.request(app);
  before(() => connect);
  beforeEach(() => dbHelper.dropColl("film"));

  function save(film) {
    return req.post("/people").send(film).then(res => {
      // console.log('7:');
      return JSON.parse(res.text);
    });
  }

  it("GET /films", () => {
    return req.get("/films", () => {}).then(res => {}).catch(err => {});
  }), it("GET /films by id", () => {
    //     return Promise(film  => {
    //   return save(film);
    // })
    const filmToGet = 1;
    return req
      .get("/films/:id", () => {})
      .send({ id: filmToGet._id })
      .then(res => {})
      .catch(err => {});
  });
});
