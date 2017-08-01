const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe('reviewer REST api', () => {

    const testStudio = {
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    };

    const testActor = {
        name: 'Noodly McNoodleface',
        dob: new Date('1987', '11', '11'),
        pob: 'Exeter, New Hampshire'
    };

    const testActor2 = {
        name: 'McCaully Culkin',
        dob: new Date('1992', '03', '11'),
        pob: 'Vale, CO'
    };
    
    let testFilm = {
        title: 'The Greatest Film Ever',
        studio: null,
        released: 1997,
        cast: [{
            role: 'Mayor of Mystery',
            actor: null
        }]
    };

    let testFilm2 = {
        title: 'The Third Greatest Film Ever',
        studio: null,
        released: 2007,
        cast: [{
            role: 'Mayor of Mystery',
            actor: null
        },{
            role: 'Comptroller of Contempt',
            actor: null
        }]
    };

    const siskel = {
        name: 'Siskel',
        company: 'filmflappers.net'
    };

    const ebert = {
        name: 'Ebert',
        company: 'cinemanima.world'
    };

    const billyBob = {
        name: 'Billy Bobawful',
        company: 'TCM'
    };

    let review1;
    let review2;
    let review3;
    let review4;


    function saveReviewer(reviewer) {
        return request.post('/reviewers')
            .send(reviewer)
            .then(({ body }) => {
                reviewer._id = body._id;
                reviewer.__v = body.__v;
                return body;
            });
    }
    function saveActor(actor) {
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                actor.__v = body.__v;
                return body;
            });
    }

    function saveStudio(studio) {
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                studio._id = body._id;
                studio.__v = body.__v;
                return body;
            });
    }

    function saveFilm(film) {
        return request.post('/films')
            .send(film)
            .then(({ body }) => {
                film._id = body._id;
                film.__v = body.__v;
                return body;
            });
    }

    function saveReview(review) {
        return request.post('/reviews')
            .send(review)
            .then(({ body }) => {
                review._id = body._id;
                review.__v = body.__v;
                return body;
            });
    }

    before ( () => {
        return connection.dropDatabase()
            .then( () => {
                return Promise.all([
                    saveReviewer(siskel),
                    saveReviewer(ebert),
                    saveActor(testActor),
                    saveActor(testActor2),
                    saveStudio(testStudio)
                ])
                .then( savedStuff => {
                    testFilm.studio = savedStuff[4]._id;
                    testFilm.cast[0].actor = savedStuff[2]._id;
                    testFilm2.studio = savedStuff[4]._id;
                    testFilm2.cast[0].actor = savedStuff[2]._id;
                    testFilm2.cast[1].actor = savedStuff[3]._id;
                    return Promise.all([
                        saveFilm(testFilm),
                        saveFilm(testFilm2)
                    ]);
                });
            })
            .then(() => {

                for (let i = 0; i < 103; i++) {
                    let review = {
                        rating: Math.floor((Math.random() * 5) + 1),
                        reviewer: i % 2 === 0 ? siskel._id : ebert._id,
                        review: `I ${ i % 4 === 0 ? 'ate' : 'threw up'}  ${i} cheezbrgrs during this film`,
                        film: i % 3 === 0 ? testFilm._id : testFilm2._id
                    };
                    saveReview(review);
                }


                review1 = {
                    rating: 2,
                    reviewer: siskel._id,
                    review: 'this movie stinks',
                    film: testFilm._id
                };

                review2 = {
                    rating: 5,
                    reviewer: siskel._id,
                    review: 'this movie was great!',
                    film: testFilm2._id
                };

                review3 = {
                    rating: 1,
                    reviewer: ebert._id,
                    review: 'I wouldn\'t let my dog chew on the DVD',
                    film: testFilm._id
                };

                review4 = {
                    rating: 4,
                    review: 'I\'d let my dog chew on the DVD',
                    reviewer: ebert._id,
                    film: testFilm2._id
                };
            });
    });

    it('saves a reviewer', () => {
        return saveReviewer(billyBob)
            .then( savedReviewer => {
                assert.ok(savedReviewer._id);
                assert.equal(savedReviewer.name, billyBob.name);
                assert.equal(savedReviewer.company, billyBob.company);
            });
    });

    it('gets a list of reviewers', () => {
        return request.get('/reviewers')
            .then( res => {
                const reviewers = res.body;
                assert.equal(reviewers.length, 3);
                assert.equal(reviewers[0]._id, ebert._id);
                assert.equal(reviewers[1]._id, siskel._id);
                assert.equal(reviewers[2]._id, billyBob._id);
            });
    });

    it('gets a reviewer by id', () => {
        return request.get(`/reviewers/${ebert._id}`)
        .then( res => {
            let gotReviewer = res.body;
            assert.equal(gotReviewer._id, ebert._id);
            assert.equal(gotReviewer.name, ebert.name);
            assert.equal(gotReviewer.company, ebert.company);
            assert.ok(gotReviewer.reviews);
            assert.ok(gotReviewer.reviews[3].rating);
            assert.ok(gotReviewer.reviews[14].review);
            assert.ok(gotReviewer.reviews[8].film);
        });
    });

    it('updates an existing reviewer', () => {
        return request.put(`/reviewers/${ebert._id}`)
            .send({ company: 'Millions Makers'})
            .then( res => {
                let rxn = res.body;
                assert.deepEqual( rxn, { modified: true });
            });
    });
});