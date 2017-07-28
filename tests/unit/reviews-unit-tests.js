const assert = require('chai').assert;
const Review = require('../../lib/models/review-model');
const Reviewer = require('../../lib/models/reviewer-model');
const Studio = require('../../lib/models/studio-model');
const Film = require('../../lib/models/film-model');


const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('review model', () => {

    it('validates good model', () => {

        const siskel = new Reviewer({
            name: 'Siskel',
            company: 'filmflappers.net'
        });

        const legionFilm = new Film({
            title: 'Legion',
        });

        const legionReview = new Review({
            rating: 3,
            reviewer: siskel._id,
            review: 'Passable, but not great. I wouldn\'t bring my kids',
            film: legionFilm._id
        });

        return legionReview.validate();
    });

    it('throws an error on bad model', () => {
        const review = new Review();

        return review.validate()
            .then( () => expectedValidation,
            ({ errors }) => {
                assert.ok(errors.rating);
                assert.ok(errors.reviewer);
                assert.ok(errors.review);
                assert.ok(errors.film);
            });
    });
});