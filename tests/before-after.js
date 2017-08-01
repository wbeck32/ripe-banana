const app = require('../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

module.exports = {
    studio: {
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    },

    saveStudio(studio) {
        console.log('saveStudio: ', studio);
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                return Promise((resolve, reject) => {
                    studio._id = body._id;
                    studio.__v = body.__v;
                    return body;
                })
            })
    },

    saveReviewer(reviewer) {
        console.log('reviewer: ', reviewer);
        return request.post('/reviewers')
            .send(reviewer)
            .then(({ body }) => {
                reviewer._id = body._id;
                reviewer.__v = body.__v;
                return body;
            });
    },

    saveReview(review) {
        console.log('review: ', review);
        return request.post('/reviews')
            .send(review)
            .then(({ body }) => {
                review._id = body._id;
                review.__v = body.__v;
                return body;
            });
    },

    saveActor(actor) {
        console.log('actor: ', actor)
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                actor.__v = body.__v;
                return body;
            });
    },

    saveFilm(film) {
        console.log('film: ', film)
        return request.post('/films')
            .send(film)
            .then(({ body }) => {
                film._id = body._id;
                film.__v = body.__v;
                film.cast = body.cast;
                film.studio = body.studio;
                film.reviews = body.reviews;
                return body;
            });
    }
}