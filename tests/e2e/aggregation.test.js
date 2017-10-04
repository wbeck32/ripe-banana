const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const req = chai.request(app);
const connection = require('mongoose').connection;
const d = require('../helpers/aggregation-data');

describe.only('aggregation e2e tests', () => {
  it('GET /films', async () => {
    // [{ title, released, studio.name, averageRating }]
    const filmData = await req.get('/aggregation');
    assert.lengthOf(filmData.body, 12);
    assert.sameMembers(
      [
        filmData.body[0].studioName,
        filmData.body[1].studioName,
        filmData.body[2].studioName,
        filmData.body[3].studioName,
        filmData.body[4].studioName,
        filmData.body[5].studioName,
        filmData.body[6].studioName,
        filmData.body[7].studioName,
        filmData.body[8].studioName,
        filmData.body[9].studioName,
        filmData.body[10].studioName
      ],
      [
        d.studioGolden.name,
        d.studioWarner.name,
        d.studioGolden.name,
        d.studioFantastico.name,
        d.studioFantastico.name,
        d.studioWarner.name,
        d.studioGolden.name,
        d.studioFantastico.name,
        d.studioGolden.name,
        d.studioWarner.name,
        d.studioFantastico.name
      ]
    );
  }),
    it('GET /films/top', async () => {
      // [{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
      const filmData = await req.get('/aggregation/top');
      assert.lengthOf(filmData.body, 12);
    }),
    it('GET /actors', async () => {
      // [{ name, movieCount }]
      const actorsAndMovies = await req.get('/aggregation/actors');
      assert.lengthOf(actorsAndMovies.body, 6);
      actorsAndMovies.body.forEach(ele => {
        if (ele.name === 'Jim Kelly') assert.equal(ele.numberOfFilms, 3);
        else if (ele.name === 'John Saxon') assert.equal(ele.numberOfFilms, 4);
        else if (ele.name === 'Bruce Lee') assert.equal(ele.numberOfFilms, 10);
        else if (ele.name === 'Nora Miao') assert.equal(ele.numberOfFilms, 10);
        else if (ele.name === 'Noodly McNoodleface')
          assert.equal(ele.numberOfFilms, 3);
        else if (ele.name === 'Paul Wei') assert.equal(ele.numberOfFilms, 4);
      });
    }),
    it('GET reviewer', async () => {
      // [{ name, company, countOfReviews, averageReview }]
    });
});

// route	data
// GET /films	[{ title, released, studio.name, averageRating }]
// GET /films/top	[{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
// GET /actors	[{ name, movieCount }]
// GET /reviewer	[{ name, company, countOfReviews, averageReview }]
