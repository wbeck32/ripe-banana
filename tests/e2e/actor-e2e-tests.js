const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana';
require('../../lib/connect');

const connection = require('mongoose').connection;

// describe('actor api', () => {

//     beforeEach(() => connection.dropDatabase());

//     function save(actor) {

//     }

// });