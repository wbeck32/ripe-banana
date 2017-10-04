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
    assert.lengthOf(filmData.body, 4);
    assert.sameMembers(
      [
        filmData.body[0].studioName,
        filmData.body[1].studioName,
        filmData.body[2].studioName,
        filmData.body[3].studioName
      ],
      [d.studioFantastico.name, d.studioGolden.name, d.studioWarner.name, d.studioGolden.name]
    );
  }),
    it('GET /films/top', async () => {
      // [{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
    }),
    it('GET /actors', async () => {
      // [{ name, movieCount }]
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
