// process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-aggregation';
// require('../../lib/connect');
// const connection = require('mongoose')
//     .connection;
// const testHelper = require('./test-helper');

// before(() => {
//     connection
//     connection.dropDatabase();

//     let testStudio = testHelper.studio;
//     let testActor = testHelper.actor;
//     let testFilm = testHelper.film;
//     let testReview = testHelper.review;
//     let testReviewer = testHelper.reviewer;

//     return Promise.all([
//             testHelper.saveStudio(testStudio)
//             .then(studio => testStudio = studio),
//             testHelper.saveActor(testActor)
//             .then(actor => testActor = actor)
//         ])
//         .then(() => {
//             testFilm.cast[0].actor = testActor._id;
//             testFilm.studio = testStudio._id;
//             return testHelper.saveFilm(testFilm)
//         })
//         .then(film => {
//             testFilm = film;
//             return testFilm;
//         })
//         .then(() => {
//             return testHelper.saveReviewer(testReviewer)
//         })
//         .then(reviewer => testReviewer = reviewer)

//         .then(() => {
//             testReview.reviewer = testReviewer;
//             testReview.film = testFilm._id;
//             testHelper.saveReview(testReview)
//                 .then(review => testReview = review)
//         })
// });