const app = require("../../lib/app");
const chai = require("chai");
const {assert} = chai.assert;
const chaiHttp = require("chai-http");
const mongoose = require("../../lib/connect");
const connection = require("mongoose").connection;
const connect = require("mongoose").connect;
const dbHelper = require("../db-helper");
const Film = require("../../lib/models/film-model");
const Studio = require("../../lib/models/studio-model");
const Actor = require("../../lib/models/actor-model");

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

  const testStudio = new Studio({
    name: "Studio Fantastico",
    address: {
        city: "Krakow",
        state:"",
        country:"Poland"
    }
  })

  const testActor = new Actor({
name: "Noodly McNoodleface",
dob: new Date("1987","11", "11"),
pob: "Exeter, New Hampshire"
  })

  const testFilm = new Film({
      title:"The Greates Film Ever",
      studio: testStudio._id,
      released: "1997",
      cast: {
          role: "Mayor of Mystery",
          actor: testActor._id
      }

  })

  function save(testFilm) {
    return req.post("/")
    .send(testFilm)
    .then(res => {
      console.log('7: ',res.text);
      return JSON.parse(res.text);
    })
  };


  it.only("POST /film",()=>{

    return req.post("/", ()=> {


    }).then(res =>{

    }).catch(err => {

    })
  }),
  it("GET /films", () => {
    return req.get("/", () => {}).then(res => {}).catch(err => {});
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
