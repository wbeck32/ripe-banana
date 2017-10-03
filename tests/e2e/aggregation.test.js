const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const req = chai.request(app);
const connection = require('mongoose').connection;

describe.only('aggregation e2e tests', () => {
  // before(() => connection.dropDatabase());

  it('GET /films', async () => {
    // [{ title, released, studio.name, averageRating }]
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
