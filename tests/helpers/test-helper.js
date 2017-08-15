const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

module.exports = {

    actor: {
        name: 'Noodly McNoodleface',
        dob: new Date('1987', '11', '11'),
        pob: 'Exeter, New Hampshire'
    },

    studio: {
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    },

    review: {
        rating: 5,
        reviewer: null,
        review: "I love a parade!",
        film: null
    },

    reviewer: {
        name: 'Mr. Crankypants',
        company: 'New York Times'
    },

    film: {
        title: 'The Greatest Film Ever',
        studio: null,
        released: 1997,
        cast: [{
            actor: null,
            role: 'Mayor of Magnetics'
        }]
    },

    saveStudio(testStudio) {
        // console.log('saveStudio: ', testStudio);
        return request.post('/studios')
            .send(testStudio)
            .then(({ body }) => {
                testStudio._id = body._id;
                testStudio.__v = body.__v;
                return testStudio;
            })
    },
    saveActor(testActor) {
        // console.log('saveActor: ', testActor)
        return request.post('/actors')
            .send(testActor)
            .then(({ body }) => {
                testActor._id = body._id;
                testActor.__v = body.__v;
                return testActor;
            });
    },
    saveFilm(testFilm) {
        // console.log('saveFilm: ', testFilm)
        return request.post('/films')
            .send(testFilm)
            .then(({ body }) => {
                testFilm._id = body._id;
                testFilm.__v = body.__v;
                return testFilm;
            });
    },

    saveReviewer(testReviewer) {
        // console.log('saveReviewer: ', testReviewer);
        return request.post('/reviewers')
            .send(testReviewer)
            .then(({ body }) => {
                testReviewer._id = body._id;
                testReviewer.__v = body.__v;
                return testReviewer;
            });
    },

    saveReview(testReview) {
        // console.log('saveReview: ', testReview);
        return request.post('/reviews')
            .send(testReview)
            .then(({ body }) => {
                testReview._id = body._id;
                testReview.__v = body.__v;
                console.log('TEST REVIEW: ', testReview);
                return testReview;
            });
    }

}