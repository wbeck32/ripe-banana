const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

module.exports = {
  studioWarner: {
    name: 'Warner Bros. Entertainment Inc.',
    address: {
      city: 'Burbank',
      state: 'California',
      country: 'United States'
    }
  },

  studioGolden: {
    name: 'Orange Sky Golden Harvest',
    address: {
      city: 'Kowloon',
      state: 'Hong Kong',
      country: 'China'
    }
  },
  studioFantastico: {
    name: 'Studio Fantastico',
    address: {
      city: 'Krakow',
      state: '',
      country: 'Poland'
    }
  },

  actorBruce: {
    name: 'Bruce Lee',
    dob: new Date(1940, 10, 27),
    pob: 'San Francisco, California, U.S.'
  },

  actorJohn: {
    name: 'John Saxon',
    dob: new Date(1935, 7, 5),
    pob: 'Brooklyn, New York City, New York, U.S.'
  },

  actorJim: {
    name: 'Jim Kelly',
    dob: new Date(1946, 4, 5),
    pob: 'Millersburg, Kentucky, U.S.'
  },

  actorNora: {
    name: 'Nora Miao',
    dob: new Date(1952, 1, 8),
    pob: 'Hong Kong'
  },

  actorPaul: {
    name: 'Paul Wei',
    dob: new Date(1929, 10, 29),
    pob: 'Nanjing, China'
  },
  actorNoodle: {
    name: 'Noodly McNoodleface',
    dob: new Date('1987', '11', '11'),
    pob: 'Exeter, New Hampshire'
  },

  // filmDragon1: {
  //   title: 'Way of the Dragon',
  //   studio: studioGolden._id,
  //   released: 1972,
  //   cast: [
  //     { role: 'Tang Lung', actor: actorBruce._id },
  //     { role: 'Chen Ching-hua', actor: actorNora._id },
  //     { role: 'Ho', actor: actorPaul._id }
  //   ]
  // },

  // filmDragon2: {
  //   title: 'Enter the Dragon',
  //   studio: studioWarner._id,
  //   released: 1973,
  //   cast: [
  //     { role: 'Lee', actor: actorBruce._id },
  //     { role: 'Roper', actor: actorJohn._id },
  //     { role: 'Williams', actor: actorJim._id }
  //   ]
  // },

  // filmFury: {
  //   title: 'Fist of Fury',
  //   studio: studioGolden._id,
  //   released: 1972,
  //   cast: [
  //     { role: 'Chen Zhen', actor: actorBruce._id },
  //     { role: "Yuan Li'er", actor: actorNora._id }
  //   ]
  // },
  // filmGreat: {
  //   title: 'The Greatest Film Ever',
  //   studio: null,
  //   released: 1997,
  //   cast: [
  //     {
  //       actor: null,
  //       role: 'Mayor of Magnificence'
  //     }
  //   ]
  // },

  // reviewerCranky: {
  //   name: 'Mr. Crankypants',
  //   company: 'New York Times'
  // },

  // reviewerSiskel: {
  //   name: 'Siskel',
  //   company: 'filmflappers.net'
  // },

  // reviewerEbert: {
  //   name: 'Ebert',
  //   company: 'cinemanima.world'
  // },

  // reviewerBob: {
  //   name: 'Billy Bobawful',
  //   company: 'TCM'
  // },
  // review0: {
  //   rating: 5,
  //   reviewer: reviewerEbert._id,
  //   review: 'I love a parade!',
  //   film: filmDragon2._id
  // },

  // review1: {
  //   rating: 2,
  //   reviewer: reviewerSiskel._id,
  //   review: 'this movie stinks',
  //   film: filmDragon1._id
  // },

  // review2: {
  //   rating: 5,
  //   reviewer: reviewerBob._id,
  //   review: 'this movie was great!',
  //   film: filmFury._id
  // },

  // review3: {
  //   rating: 1,
  //   reviewer: reviewerEbert._id,
  //   review: "I wouldn't let my dog chew on the DVD",
  //   film: filmDragon1._id
  // },

  // review4: {
  //   rating: 4,
  //   review: "I'd let my dog chew on the DVD",
  //   reviewer: reviewerBob._id,
  //   film: filmDragon1._id
  // },

  saveStudio(testStudio) {
    // console.log('saveStudio: ', testStudio);
    return request
      .post('/studios')
      .send(testStudio)
      .then(({ body }) => {
        testStudio._id = body._id;
        testStudio.__v = body.__v;
        return testStudio;
      });
  },
  saveActor(testActor) {
    // console.log('saveActor: ', testActor)
    return request
      .post('/actors')
      .send(testActor)
      .then(({ body }) => {
        testActor._id = body._id;
        testActor.__v = body.__v;
        return testActor;
      });
  },
  saveFilm(testFilm) {
    // console.log('saveFilm: ', testFilm)
    return request
      .post('/films')
      .send(testFilm)
      .then(({ body }) => {
        testFilm._id = body._id;
        testFilm.__v = body.__v;
        return testFilm;
      });
  },

  saveReviewer(testReviewer) {
    // console.log('saveReviewer: ', testReviewer);
    return request
      .post('/reviewers')
      .send(testReviewer)
      .then(({ body }) => {
        testReviewer._id = body._id;
        testReviewer.__v = body.__v;
        return testReviewer;
      });
  },

  saveReview(testReview) {
    // console.log('saveReview: ', testReview);
    return request
      .post('/reviews')
      .send(testReview)
      .then(({ body }) => {
        testReview._id = body._id;
        testReview.__v = body.__v;
        return testReview;
      });
  }





};
