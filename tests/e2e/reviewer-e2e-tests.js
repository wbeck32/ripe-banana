const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const Reviewer = require('../../lib/models/reviewer-model');


process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe.only('reviewer REST api', () => {

    before (() => connection.dropDatabase());

    const siskel = new Reviewer({
        name: 'Siskel',
        company: 'filmflappers.net'
    });

    const ebert = new Reviewer({
        name: 'Ebert',
        company: 'cinemanima.world'
    });

    function saveReviewer(reviewer) {
        return request.post('/api/reviewers')
            .send(reviewer)
            .then(({ body }) => {
                reviewer._id = body._id;
                reviewer.__v = body.__v;
                return body;
            });
    }

    it('saves a reviewer', () => {
        return saveReviewer(siskel)
            .then( savedReviewer => {
                assert.ok(savedReviewer._id);
                assert.equal(savedReviewer.name, siskel.name);
                assert.equal(savedReviewer.company, siskel.company);
            });
    });

    it('gets a list of reviewers', () => {
        return saveReviewer(ebert)
            .then(() => request.get('/api/reviewers'))
            .then( res => {
                const reviewers = res.body;
                assert.equal(reviewers.length, 2);
                assert.equal(reviewers[0]._id, siskel._id);
                assert.equal(reviewers[1]._id, ebert._id);
            });
    });
});