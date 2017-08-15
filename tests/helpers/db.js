const connection = require('mongoose').connection;

module.exports = {
  dropDb() {
    console.log('dropping it');
    return connection.dropDatabase();
  }
};
