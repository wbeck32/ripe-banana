const app = require('../../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const testHelper = require('../helpers/test-helper');
const db = require('../helpers/db');

describe.only('film e2e tests', () => {
    const req = chai.request(app);

    let testStudio = testHelper.studio;
    // let testActor = testHelper.actor;
    let testFilm = testHelper.film;
    // let testReview = testHelper.review;
    // let testReviewer = testHelper.reviewer;

    before(() => {
        //function to save multiple films
        //function to save multiple reviews
        // function to save multiple actors
    });

    it('POST /film', () => {
            testFilm.studio = testStudio;
            return req.post('/films')
                .send(testFilm)
                .then(savedFilm => {
                    // console.log('saved film: ', savedFilm.body)
                    // assert
                });
        }),
        it('GET /films', () => {
            return req.get('/films')
                .then(films => {
                    // console.log('films: ', films.body);
                    // assert
                });
        }),
        it('GET /film by id', () => {
            return req.post('/films')
                .send(testFilm)
                .then(savedFilm => {
                    // console.log('savedFilm: ', savedFilm.body)
                    return savedFilm.body._id
                })
                .then(savedId => {
                    return req.get('/films')
                        .query({ id: savedId })
                        .then(res => {
                            // console.log('res: ', res.body);

                        })

                });

        }),
        it('DELETE /films by id', () => {
            return req.post('/films')
                .send(testFilm)
                .then(savedFilm => {
                    // console.log('savedFilm: ', savedFilm.body)
                    return savedFilm.body._id
                })
                .then(savedId => {
                    return req.delete('/films')
                        .query({ id: savedId })
                        .then(res => {
                            assert.equal(res.status, 200);

                        })

                });
        }),
        it('PATCH /films', () => {
            return req.post('/films')
                .send(testFilm)
                .then(savedFilm => {
                    // console.log(savedFilm)
                    return req.patch('/films')
                        .send({ id: savedFilm._id, newTitle: 'The Worst Film Ever' })
                        .then(res => {
                            assert.equal(res.statusCode, 200);

                        });
                });
        });
});