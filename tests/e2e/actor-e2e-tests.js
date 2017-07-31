const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

const Studio = require('../../lib/models/studio-model');
const Actor = require('../../lib/models/actor-model');
const Film = require('../../lib/models/film-model');

describe.only('actor e2e tests', () => {

    before(() => connection.dropDatabase());

    let warner = new Studio ({
        name: 'Warner Bros. Entertainment Inc.',
        address: {
            city: 'Burbank',
            state: 'California',
            country: 'United States'
        }
    });
    
    let golden = new Studio ({
        name: 'Orange Sky Golden Harvest',
        address: {
            city: 'Kowloon',
            state: 'Hong Kong',
            country: 'China'
        }
    });

    let bruce = new Actor ({
        name: 'Bruce Lee',
        dob: new Date(1940, 10, 27),
        pob: 'San Francisco, California, U.S.'
    });

        
    let john = new Actor ({
        name: 'John Saxon',
        dob: new Date(1935, 7, 5),
        pob: 'Brooklyn, New York City, New York, U.S.'
    });

    let jim = new Actor ({
        name: 'Jim Kelly',
        dob: new Date(1946, 4, 5),
        pob: 'Millersburg, Kentucky, U.S.'
    });

    let nora = new Actor ({
        name: 'Nora Miao',
        dob: new Date(1952, 1, 8),
        pob: 'Hong Kong'
    });

    let riki = new Actor ({ name: 'Riki Hashimoto' });

    let robert = new Actor ({ name: 'Robert Baker' });

    let paul = new Actor ({
        name: 'Paul Wei',
        dob: new Date(1929, 10, 29),
        pob: 'Nanjing, China'
    });
    
    let dragon1 = new Film ({
        title: 'Way of the Dragon',
        studio: golden._id,
        released: 1972,
        cast: [
            { role: 'Tang Lung', actor: bruce._id },
            { role: 'Chen Ching-hua', actor: nora._id },
            { role: 'Ho', actor: paul._id }
        ]
    });

    let dragon2 = new Film ({
        title: 'Enter the Dragon',
        studio: warner._id,
        released: 1973,
        cast: [
            { role: 'Lee', actor: bruce._id },
            { role: 'Roper', actor: john._id },
            { role: 'Williams', actor: jim._id }
        ]
    });
    
    let fury = new Film ({
        title: 'Fist of Fury',
        studio: golden._id,
        released: 1972,
        cast: [
            { role: 'Chen Zhen', actor: bruce._id },
            { role: 'Yuan Li\'er', actor: nora._id },
            { role: 'Hiroshi Suzuki', actor: riki._id },
            { role: 'Petrov', actor: robert._id }
        ]
    });

    function saveStudio(studio) {
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                studio._id = body._id;
                studio.__v = body.__v;
                studio.address = body.address;
                return body;
            });
    }

    function saveActor(actor) {
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                actor.__v = body.__v;
                actor.dob = body.dob;
                actor.pob = body.pob;
                return body;
            });
    }

    function saveFilm(film) {
        return request.post('/films')
            .send(film)
            .then(({ body }) => {
                film._id = body._id;
                film.__v = body.__v;
                film.cast = body.cast;
                film.studio = body.studio;
                return body;
            });
    }

    before(() => {
        let actorsList = [bruce, john, jim, nora, riki, robert, paul];
        Promise.all(actorsList.map(saveActor))
            .then(saveStudio(warner))
            .then(saveFilm(dragon2))
            .then(saveStudio(golden))
            .then(saveFilm(dragon1))
            .then(saveFilm(fury));

    });
    
    it('saves an actor', () => {
        let jackie = {
            name: 'Jackie Chan',
            dob: new Date(1954, 3, 7),
            pob: 'Victoria Peak, Hong Kong'
        };

        return saveActor(jackie)
            .then(saved => {
                assert.isOk(saved._id);
                assert.equal(saved.name, jackie.name);
                assert.equal(saved.dob, jackie.dob);
                assert.equal(saved.pob, jackie.pob);
            });
    });

    it('gets all actors with count of films', () => {
        
    //TODO: get count of films
        return request.get('/actors')
            .then(res => {
                assert.equal(res.body.length, 8);
            });
    });

    it.skip('gets an actor by id with list of their films', () => {
        return request.get(`/actors/${bruce._id}`)
            .then(res => {
                assert.equal(res.body.name, bruce.name);
                // assert.equal(res.body.dob, bruce.dob); //QUESTION: why can't I compare dates?
                assert.equal(res.body.pob, bruce.pob);
                assert.equal(res.body.films.length, 3);
            });
    });

    it('removes an actor by id', () => {
        let chuck = { name: 'Chuck Norris' };

        return saveActor(chuck)
            .then(res => res.body = chuck)
            .then(() => request.delete(`/actors/${chuck._id}`))
            .then(res => res.body)
            .then(result => {
                assert.deepEqual(result, { removed: true });
            });
    });

    it('updates an actor by id', () => {
        let steven = new Actor ({
            name: 'Steven Seagal',
            dob: new Date(1957, 6, 18),
            pob: 'Hong Kong'
        });

        const changes = {
            dob: new Date(1952, 3, 10),
            pob: 'Lansing, Michigan'
        };

        return saveActor(steven)
            .then(res => res.body = steven)
            .then(() => request.patch(`/actors/${steven._id}`).send(changes))
            .then(res => {
                assert.deepEqual(new Date(res.body.dob), changes.dob);
                assert.deepEqual(res.body.pob, changes.pob);
            });

    });

});