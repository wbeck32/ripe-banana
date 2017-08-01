const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe.only('studio REST api', () => {

    const testStudio = {
        name: 'Studio Fantastico',
        address: {
            city: 'Krakow',
            state: '',
            country: 'Poland'
        }
    };

    function saveStudio(studio) {
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                studio._id = body._id;
                studio.__v = body.__v;
                return body;
            });
    }

    before ( () => connection.dropDatabase());

    it('saves a studio', () => {
        return saveStudio(testStudio)
            .then( savedStudio => {
                assert.ok(savedStudio._id);
                assert.equal(savedStudio.name, testStudio.name);
                assert.equal(savedStudio.address.city, 'Krakow');
            });
    });

    it('updates a studio', () => {
        return request.put(`/studios/${testStudio._id}`)
            .send({ name: 'Ocukys Pictures' })
            .then( res => {
                let rxn = res.body;
                assert.deepEqual( rxn, { modified: true });
            });
    });
});