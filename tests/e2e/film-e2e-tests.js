const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Film = require('../../lib/models/film-model');
const Studio = require('../../lib/models/studio-model');
const Actor = require('../../lib/models/actor-model');
const Reviewer = require('../../lib/models/reviewer-model');
const Review = require('../../lib/models/review-model');

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');
const connection = require('mongoose')
    .connection;

describe.skip('film e2e tests', () => {
    const req = chai.request(app);
    before(() => connection);
    beforeEach(() => connection.dropDatabase());

    const testStudio = new Studio({
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    });
    const testActorA = new Actor({
        name: 'Noodly McNoodleface',
        dob: new Date('1987', '11', '11'),
        pob: 'Exeter, New Hampshire'
    });
    const testActorB = new Actor({
        name: 'The Amazing Harold',
        dob: new Date('1987', '12', '12'),
        pob: 'Colorado Springs, CO'
    });

    let testCast = [testActorA, testActorB];

    let testFilm = new Film({
        title: 'The Greatest Film Ever',
        studio: testStudio._id,
        released: 1997,
        cast: testCast,
        reviews: []
    });

    const testReviewer = new Reviewer({
        name: 'Mr. Crankypants',
        company: 'New York Times'
    });

    const testReview = new Review({
        rating: 5,
        reviewer: testReviewer,
        review: "I love a parade!",
        film: testFilm._id
    });
    testFilm.reviews = testReview;

    let testFilmA = {
        title: 'The Funniest Film Ever',
        studio: testStudio._id,
        released: 1999,
        cast: [{
            role: 'Mayor of Mystery',
            actor: testActorA._id
        }],
        reviews: []
    }
    let testFilmB = {
        title: 'The Second Funniest Film Ever',
        studio: testStudio._id,
        released: 1997,
        cast: [{
            role: 'Mayor of Mystery',
            actor: testActorB._id
        }],
        reviews: []
    }
    let testFilmC = {
        title: 'The Third Funniest Film Ever',
        studio: testStudio._id,
        released: 2007,
        cast: [{
            role: 'Mayor of Mystery',
            actor: testActorA._id
        }],
        reviews: []
    };

    testFilmA.reviews = testReview;
    testFilmB.reviews = testReview;
    testFilmC.reviews = testReview;

    let testFilms = [ testFilmA,testFilmB,testFilmC];

    function save(testFilm) {
        // console.log('2: ', testFilm);
        return req.post('/films')
            .send(testFilm)
            .then(({ body }) => {
                // console.log('2.5: ', body.cast);
                testFilm.__v = body.__v;
                testFilm._id = body._id;
                testFilm.cast = body.cast;
                testFilm.studio = body.studio;
                testFilm.reviews = body.reviews;
                console.log('2.8: ', testFilm);
                return testFilm;
            });
    }

    it('POST /film', () => {
        return save(testFilm)
            .then(savedFilm => {
                console.log('2.75: ', savedFilm);
                assert.equal(testFilm.released, savedFilm.released);
                assert.deepEqual(testFilm, savedFilm);
            });
    }), it.only('GET /films', () => {
        // TODO: don't create consts as objects
        console.log('1: ', testFilms);
        // let filmName = Object.entries(testFilms)
        //     .map(function(film) {
        //         return film[1][Object.getOwnPropertyNames(film[1])];
        //     });
        return Promise.all(testFilms.forEach(film,() => {
                console.log('in save film: ', film);
                return save(film);
            }))
            .then(saved => {
                console.log(typeof saved, saved);
                testFilms = saved.forEach((item) => {
                    console.log(item);
                });
                console.log('2.85: ', testFilms);

                // .map((f) => {
                // testFilms = f;
                // console.log(f);

                // testFilms : saved;
                // console.log('2.85: ', testFilms);
                return req.get('/films')
                    .then(films => {
                        // console.log('body: ',films.body);
                        // console.log('tf: ',testFilms)
                        assert.equal(3, films.body.length);
                        // assert.deepEqual(films.body, testFilms);
                    });
            });

    }), it('GET /film by id', () => {
        let filmId = null;
        return save(testFilm)
            .then(savedFilm => {
                filmId = '_' + savedFilm._id;
                return req.get('/films')
                    .query({ id: filmId })
                    .then(res => {
                        assert.equal(body.body[0]._id, savedFilm._id);
                    });
            });
    }), it('DELETE /films by id', () => {
        let filmId = null;
        return save(testFilm)
            .then(savedFilm => {
                filmId = '_' + savedFilm._id;
                return req.del('/films')
                    .query({ id: filmId })
                    .then(res => {
                        assert.equal(body.statusCode, 200);
                    });
            });
    }), it('PATCH /films', () => {
        return save(testFilm)
            .then(savedFilm => {
                return req.patch('/films')
                    .send({ id: savedFilm._id, newTitle: 'The Worst Film Ever' })
                    .then(res => {
                        assert.equal(body.statusCode, 200);
                        assert.equal(body.body.title, 'The Worst Film Ever');
                    });
            });
    });
});