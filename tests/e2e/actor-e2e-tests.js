const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe.only('actor e2e tests', () => {

    before(() => connection.dropDatabase());

    let studios = {
        warner: {
            name: 'Warner Bros. Entertainment Inc.',
            address: {
                city: 'Burbank',
                state: 'California',
                country: 'United States'
            }
        },
        golden: {
            name: 'Orange Sky Golden Harvest',
            address: {
                city: 'Kowloon',
                state: 'Hong Kong',
                country: 'China'
            }
        }
    };

    let actors = {
        bruce: {
            name: 'Bruce Lee',
            dob: new Date(1940, 10, 27),
            pob: 'San Francisco, California, U.S.'
        },
        john: {
            name: 'John Saxon',
            dob: new Date(1935, 7, 5),
            pob: 'Brooklyn, New York City, New York, U.S.'
        },
        jim: {
            name: 'Jim Kelly',
            dob: new Date(1946, 4, 5),
            pob: 'Millersburg, Kentucky, U.S.'
        },
        nora: {
            name: 'Nora Miao',
            dob: new Date(1952, 1, 8),
            pob: 'Hong Kong'
        },
        riki: {
            name: 'Riki Hashimoto'
        },
        robert: {
            name: 'Robert Baker'
        },
        paul: {
            name: 'Paul Wei',
            dob: new Date(1929, 10, 29),
            pob: 'Nanjing, China'
        },
    };

    let films = {
        dragon1: {
            title: 'Way of the Dragon',
            studio: studios.golden._id,
            released: 1972,
            cast: [
                {
                    role: 'Tang Lung',
                    actor: actors.bruce._id
                },{
                    role: 'Chen Ching-hua',
                    actor: actors.nora._id
                },{
                    role: 'Ho',
                    actor: actors.paul._id
                }
            ]
        },
        dragon2: {
            title: 'Enter the Dragon',
            studio: studios.warner._id,
            released: 1973,
            cast: [
                {
                    role: 'Lee',
                    actor: actors.bruce._id
                },{
                    role: 'Roper',
                    actor: actors.john._id
                },{
                    role: 'Williams',
                    actor: actors.jim._id
                }
            ]
        },
        fury: {
            title: 'Fist of Fury',
            studio: studios.golden._id,
            released: 1972,
            cast: [
                {
                    role: 'Chen Zhen',
                    actor: actors.bruce._id
                },{
                    role: ' Yuan Li\'er',
                    actor: actors.nora._id
                },{
                    role: 'Hiroshi Suzuki',
                    actor: actors.riki._id
                },{
                    role: 'Petrov',
                    actor: actors.robert._id
                }
            ] 
        }
    };

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
                // film.cast = body.cast;
                // film.studio = body.studio;
                return body;
            });
    }


    before(() => {
        saveStudio(studios.warner)
            .then(saved => studios.warner = saved)
            .then(Promise.all([
                saveActor(actors.bruce),
                saveActor(actors.nora),
                saveActor(actors.paul)
            ]))
            .then(saveFilm(films.dragon1))
            .then(saved => films.dragon1 = saved);
    });
    
    it('saves an actor', () => {
        return saveActor(actors.jim)
            .then(saved => {
                saved = actors.jim;
                assert.isOk(saved._id);
                assert.equal(saved.name, actors.jim.name);
                assert.equal(saved.dob, actors.jim.dob);
                assert.equal(saved.pob, actors.jim.pob);
            });

    });

    //TODO: this is not finished
    it.skip('gets all actors with count of films', () => {
        let actorList = [actors.bruce, actors.jim, actors.nora, actors.paul];

        return request.get('/actors')
            .then(res => {
                const found = res.body.sort((a, b) => a._id > b._id ? 1: -1 );
                assert.deepEqual(found, actorList);
            });
    });

    //TODO: this is not finished
    //	{ name, dob, pob, films: [ name, released ] }
    it.skip('gets an actor by id with list of their films', () => {
        return request.get(`/actors/${actors.bruce._id}`)
            .then(res => {
                assert.deepEqual(res.body, actors.bruce);
            });
    });

    it('removes an actor by id', () => {
        return saveActor(actors.robert)
            .then(saved => actors.robert = saved)
            .then(request.delete(`/actors/${actors.robert._id}`))
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });
    });

    // it('updates and actor by id', () => {

    // });

});