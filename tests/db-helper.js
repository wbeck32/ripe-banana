const connection = require("mongoose").connection;

module.exports = {
  dropDB() {
    return connection.dropDatabase();
  },
  dropColl(name) {
    const collection = connection.db.collection(name);
    console.log('collection: ', collection);
    if (collection) collection.drop();
  }
};
