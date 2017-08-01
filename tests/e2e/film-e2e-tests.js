const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const testHelper = require('../before-after');

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');
const connection = require('mongoose')
    .connection;

describe('film e2e tests', () => {
    const req = chai.request(app);

    let testStudio = testHelper.studio;
    let testActor = testHelper.actor;
    let testFilm = testHelper.film;
    let testReview = testHelper.review;
    let testReviewer = testHelper.reviewer;

    before(() => {
        connection
        connection.dropDatabase();

        return Promise.all([
                testHelper.saveStudio(testStudio)
                .then(studio => testStudio = studio),
                testHelper.saveActor(testActor)
                .then(actor => testActor = actor)
            ])
            .then(() => {
                testFilm.cast[0].actor = testActor._id;
                testFilm.studio = testStudio._id;
                return testHelper.saveFilm(testFilm)
            })
            .then(film => {
                testFilm = film;
                return testFilm;
            })
            .then(() => {
                return testHelper.saveReviewer(testReviewer)

            })
            .then(reviewer => testReviewer = reviewer)

            .then(() => {
                testReview.reviewer = testReviewer;
                testReview.film = testFilm._id;
                testHelper.saveReview(testReview)
                    .then(review => testReview = review)
            })

    });


    it.skip('POST /film', () => {
        // console.log('---- IN TEST ----');
        // console.log('testStudio: ', testStudio);
        // console.log('testActor: ', testActor);
        // console.log('testFilm: ', testFilm);
        // console.log('testReviewer: ', testReviewer);
        // console.log('testReview: ', testReview);
        return req.post(testFilm, () => {})
        .then(res, () => {
            console.log(res);
        })
    });
    // , it('GET /films', () => {
    //     // TODO: don't create consts as objects
    //     console.log('1: ', testFilms);
    //     // let filmName = Object.entries(testFilms)
    //     //     .map(function(film) {
    //     //         return film[1][Object.getOwnPropertyNames(film[1])];
    //     //     });
    //     return Promise.all(testFilms.forEach(film, () => {
    //             console.log('in save film: ', film);
    //             return save(film);
    //         }))
    //         .then(saved => {
    //             console.log(typeof saved, saved);
    //             testFilms = saved.forEach((item) => {
    //                 console.log(item);
    //             });
    //             console.log('2.85: ', testFilms);

    //             // .map((f) => {
    //             // testFilms = f;
    //             // console.log(f);

    //             // testFilms : saved;
    //             // console.log('2.85: ', testFilms);
    //             return req.get('/films')
    //                 .then(films => {
    //                     // console.log('body: ',films.body);
    //                     // console.log('tf: ',testFilms)
    //                     assert.equal(3, films.body.length);
    //                     // assert.deepEqual(films.body, testFilms);
    //                 });
    //         });

    // }), it('GET /film by id', () => {
    //     let filmId = null;
    //     return save(testFilm)
    //         .then(savedFilm => {
    //             filmId = '_' + savedFilm._id;
    //             return req.get('/films')
    //                 .query({ id: filmId })
    //                 .then(res => {
    //                     assert.equal(body.body[0]._id, savedFilm._id);
    //                 });
    //         });
    // }), it('DELETE /films by id', () => {
    //     let filmId = null;
    //     return save(testFilm)
    //         .then(savedFilm => {
    //             filmId = '_' + savedFilm._id;
    //             return req.del('/films')
    //                 .query({ id: filmId })
    //                 .then(res => {
    //                     assert.equal(body.statusCode, 200);
    //                 });
    //         });
    // }), it('PATCH /films', () => {
    //     return save(testFilm)
    //         .then(savedFilm => {
    //             return req.patch('/films')
    //                 .send({ id: savedFilm._id, newTitle: 'The Worst Film Ever' })
    //                 .then(res => {
    //                     assert.equal(body.statusCode, 200);
    //                     assert.equal(body.body.title, 'The Worst Film Ever');
    //                 });
    //         });
    // });
});