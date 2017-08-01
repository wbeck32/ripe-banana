const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const testHelper = require('../helpers/test-helper');



describe('film e2e tests', () => {
    const req = chai.request(app);

    let testStudio = testHelper.studio;
    let testActor = testHelper.actor;
    let testFilm = testHelper.film;
    let testReview = testHelper.review;
    let testReviewer = testHelper.reviewer;

    before(() => {

    });


    it('POST /film', () => {
                console.log('---- IN TEST ----');
        console.log('testStudio: ', testStudio);
        console.log('testActor: ', testActor);
        console.log('testFilm: ', testFilm);
        console.log('testReviewer: ', testReviewer);
        console.log('testReview: ', testReview);


        // return req.post('/films')
        //     .send(testFilm)
        //     .then(savedFilm => {
        //         console.log(savedFilm);
        //     });
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