const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Reviewer = require('../../lib/models/reviewer-model');
const Film = require('../../lib/models/film-model');
const Studio = require('../../lib/models/studio-model');
const Actor = require('../../lib/models/actor-model');

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe.only('reviews REST API', () => {

    const testStudio = new Studio({
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    });

    const testActor = new Actor({
        name: 'Noodly McNoodleface',
        dob: new Date('1987', '11', '11'),
        pob: 'Exeter, New Hampshire'
    });

    const testActor2 = new Actor({
        name: 'McCaully Culkin',
        dob: new Date('1992', '03', '11'),
        pob: 'Vale, CO'
    });
    
    const testFilm = new Film({
        title: 'The Greatest Film Ever',
        studio: testStudio._id,
        released: 1997,
        cast: {
            role: 'Mayor of Mystery',
            actor: testActor._id
        }
    });

    const testFilm2 = new Film({
        title: 'The Third Greatest Film Ever',
        studio: testStudio._id,
        released: 2007,
        cast: [{
            role: 'Mayor of Mystery',
            actor: testActor._id
        },{
            role: 'Comptroller of Contempt',
            actor: testActor2._id
        }]
    });

    const siskel = new Reviewer({
        name: 'Siskel',
        company: 'filmflappers.net'
    });

    const ebert = new Reviewer({
        name: 'Ebert',
        company: 'cinemanima.world'
    });

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

    const review1 = {
        rating: 2,
        reviewer: siskel._id,
        review: 'this movie stinks',
        film: testFilm._id
    };

    const review2 = {
        rating: 5,
        reviewer: siskel._id,
        review: 'this movie was great!',
        film: testFilm2._id
    };

    const review3 = {
        rating: 1,
        reviewer: ebert._id,
        review: 'I wouldn\'t let my dog chew on the DVD',
        film: testFilm._id
    };

    const review4 = {
        rating: 4,
        reviewer: ebert._id,
        review: 'I\'d let my dog chew on the DVD',
        film: testFilm2._id
    };

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
        connection.dropDatabase();
    
        Promise.all([
            saveReviewer(siskel),
            saveReviewer(ebert),
            saveActor(testActor),
            saveStudio(testStudio)
        ]);
    });

    it('saves a review', () => {
        return saveReview(review1)
            .then( savedReview => {
                assert.ok(savedReview._id);
                assert.ok(savedReview.createdAt);
                assert.ok(savedReview.updatedAt);
                assert.equal(savedReview.rating, 2);
                assert.equal(savedReview.review, 'this movie stinks');
            });

    });

    it('updates a review', () => {
        return request.put(`/reviews/${review1._id}`)
            .send( { review: 'this movie is ok' })
            .then( res => {
                let rxn = res.body;
                assert.deepEqual( rxn, { modified: true });
            });
    });

    it('returns a list of reviews', () =>{
        return Promise.all([
            saveActor(testActor2),
            saveFilm(testFilm),
            saveFilm(testFilm2),
            saveReview(review2),
            saveReview(review3),
            saveReview(review4)
        ])
        .then(() => request.get('/reviews'))
        .then( res => {
            const reviews = res.body;
            assert.equal(reviews.length, 4);
            assert.equal(reviews[0].rating, 2);
            assert.equal(reviews[2].film.title, 'The Greatest Film Ever');
            assert.equal(reviews[3].film.title, 'The Third Greatest Film Ever');
        });
    });

});