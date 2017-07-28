const Film = require("../../lib/models/film-model");
const { assert } = require("chai");
const mongoose = require("../../lib/connect");

describe("film model unit tests", () => {

  it("film has a title", () => {
    const myFilm = new Film({
      title: 'Filmy McFilmface',
      studio: 'Studio Z',
      released:'2016',
      cast:{
        role: 'leading lady',
        actor:'Scarlett Johanssen'
    }});

    return myFilm
    .validate()
      .then(() => {
// assertions
      })
        .catch(() => {
          // console.log(errors);
        });

  }), it("film has a studio id", () => {}), it("film has at least one actor", () => {}), it("film is invalid", () => {});
});
