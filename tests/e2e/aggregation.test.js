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
      const filmData = await req.get('/aggregation/top');
      assert.lengthOf(filmData.body, 12);
    }),
    it('GET /actors', async () => {
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
      const reviewers = await req.get('/aggregation/reviewers');
      assert.lengthOf(reviewers.body, 4);
      reviewers.body.forEach(reviewer => {
        if (reviewer.name === 'Mr. Crankypants')
          assert.equal(reviewer.averageOfReviews, 3);
        else if (reviewer.name === 'Billy Bobawful')
          assert.equal(reviewer.numberOfReviews, 6);
        else if (reviewer.name === 'Ebert')
          assert.equal(reviewer.averageOfReviews, 4);
        else if (reviewer.name === 'Siskel')
          assert.equal(reviewer.numberOfReviews, 6);
      });
    });
});

// route	data
// GET /films	[{ title, released, studio.name, averageRating }]
// GET /films/top	[{ title, released, studio.name, averageRating }] * top 10 sorted by highest rating
// GET /actors	[{ name, movieCount }]
// GET /reviewer	[{ name, company, countOfReviews, averageReview }]
