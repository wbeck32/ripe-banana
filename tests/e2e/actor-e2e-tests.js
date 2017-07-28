const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe.only('actor api', () => {

    beforeEach(() => connection.dropDatabase());

    function save(actor) {
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                actor.__v = body.__v;
                return body;
            });
            // .then(res => JSON.parse(res.text));
    }
    
    it('saves an actor', () => {
        let actor = {
            name: 'Jennifer Lawrence',
            dob: new Date(1990, 7, 15),
            pob: 'Indian Hills, Kentucky'
        };

        return save(actor)
            .then(saved => {
                // assert.isOk(res.body._id);
                assert.equal(saved.name, actor.name);
                // assert.equal(saved.dob, actor.dob); //check out chai-datetime
                assert.equal(saved.pob, actor.pob);
            });

    });

    it('gets all actors', () => {
        let actors = [{ name: 'Chuck Norris' }, { name: 'Steven Seagal' }];

        return Promise.all(actors.map(save))
            .then(saved => actors = saved)
            .then(() => request.get('/actors'))
            .then(res => {
                // const saved = res.body.sort((a, b) => a._id > b._id ? 1 : -1 );
                assert.deepEqual(res.body, actors);
            });
    });

});