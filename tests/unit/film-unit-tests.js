const Film = require("../../lib/models/film-model");
const Studio = require("../../lib/models/studio-model");
const Actor = require("../../lib/models/actor-model");
const { assert } = require("chai");
const mongoose = require("../../lib/connect");

const expectedValidation = () => {
  throw new Error("expected validation errors");
};

describe("film model unit tests", () => {
  it("film validates", () => {
      const studio = new Studio({
        name: "Studio Z"
      });
      const actor = new Actor({
        name: "Scarlett Johanssen"
      });

      const myFilm = new Film({
        title: "Filmy McFilmface",
        studio: studio._id,
        released: "2016",
        cast: {
          role: "leading lady",
          actor: actor._id
        }
      });

      return myFilm.validate();
    }),

    it("film validation fails", () => {
      const studio = new Studio({});
      const actor = new Actor({
        name: "Scarlett Johanssen"
      });

      const myFilm = new Film({
        title: "Filmy McFilmface",
        studio: studio._id,
        released: "2016",
        cast: {
          role: "leading lady",
          actor: actor._id
        }
      });

      return myFilm.validate();
    });
});