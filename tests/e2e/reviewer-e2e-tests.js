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

    before (() => connection.dropDatabase());

    const siskel = {
        name: 'Siskel',
        company: 'filmflappers.net'
    };

    const ebert = {
        name: 'Ebert',
        company: 'cinemanima.world'
    };

    function saveReviewer(reviewer) {
        return request.post('/reviewers')
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
            .then(() => request.get('/reviewers'))
            .then( res => {
                const reviewers = res.body;
                assert.equal(reviewers.length, 2);
                assert.equal(reviewers[0]._id, siskel._id);
                assert.equal(reviewers[1]._id, ebert._id);
            });
    });

    it('gets a reviewer by id', () => {
        return request.get(`/reviewers/${ebert._id}`)
        
        .then( res => {
            let gotReviewer = res.body;
            assert.equal(gotReviewer._id, ebert._id);
            assert.equal(gotReviewer.name, ebert.name);
            assert.equal(gotReviewer.company, ebert.company);
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