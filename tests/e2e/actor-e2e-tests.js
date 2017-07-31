const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('actor e2e tests', () => {

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
        // let actorsList = Object.keys(actors).map((key) => actors[key]);

        // QUESTION: probably a better way to do this.
        // Promise.all([
        //     saveActor(actors.bruce),
        //     saveActor(actors.john),
        //     saveActor(actors.jim),
        //     saveActor(actors.nora),
        //     saveActor(actors.riki),
        //     saveActor(actors.robert),
        //     saveActor(actors.paul)
        // ])
        //     // .then(saved => actors = saved);
        //     .then(saved => saved.forEach(a => actors[a.name]._id = saved._id));

            // console.log('saved actors >>>>>>', actors);

        saveActor(actors.bruce).then(saved => actors.bruce = saved)
            .then(saveActor(actors.john).then(saved => actors.john = saved))
            .then(saveActor(actors.jim).then(saved => actors.jim = saved))
            .then(saveActor(actors.nora).then(saved => actors.nora = saved))
            .then(saveActor(actors.riki).then(saved => actors.riki = saved))
            .then(saveActor(actors.robert).then(saved => actors.robert = saved))
            .then(saveActor(actors.paul).then(saved => actors.paul = saved))


            .then(saveStudio(studios.warner)).then(saved => studios.warner = saved)
            .then(saveFilm(films.dragon2)).then(saved => films.dragon2 = saved)
        
            .then(saveStudio(studios.golden)).then(saved => studios.golden = saved)
            .then(saveFilm(films.dragon1)).then(saved => films.dragon1 = saved)
            .then(saveFilm(films.fury)).then(saved => films.fury = saved);

            // console.log('actors>>>>>>>>', actors);
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

    //TODO: don't know how to get count of films
    it('gets all actors with count of films', () => {
        // const actorsList = Object.keys(actors).map((key) => actors[key]);
        // let actorsList = [actors.bruce, actors.paul, actors.nora, actors.jim];//.sort((a, b) => a._id > b._id ? 1: -1 );

        // const actorsList = Object.keys(actors).map((key) => actors[key].name);
        // console.log('ACTOR LIST >>>>>>>', actorsList);


        return request.get('/actors')
            .then(res => {
                const found = res.body.sort((a, b) => a._id > b._id ? 1: -1 );
                assert.deepEqual(found, actors);
            });
    });

    //TODO: don't know how to get their films
    //	{ name, dob, pob, films: [ name, released ] }
    it.skip('gets an actor by id with list of their films', () => {
        return request.get(`/actors/${actors.bruce._id}`)
            .then(res => {
                assert.deepEqual(res.body, actors.bruce);
            });
    });

    it('removes an actor by id', () => {
        return saveActor(actors.robert)
            .then(res => res.body = actors.robert)
            .then(() => request.delete(`/actors/${actors.robert._id}`))
            .then(res => res.body)
            .then(result => {
                assert.deepEqual(result, { removed: true });
            });
    });

    it('updates and actor by id', () => {
        const changes = {
            dob: new Date(1957, 6, 18),
            pob: 'Hong Kong'
        };

        return saveActor(actors.riki)
            .then(res => res.body = actors.riki)
            .then(() => request.patch(`/actors/${actors.riki._id}`).send(changes))
            .then(result => {
                assert.deepEqual(result.dob, actors.riki.dob);
                assert.deepEqual(result.pob, actors.riki.pob);
            });

    });

});