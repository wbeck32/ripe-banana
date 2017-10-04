const {
  saveStudio,
  saveActor,
  saveFilm,
  saveReviewer,
  saveReview
} = require('./aggregation-data');
const d = require('./aggregation-data');
const connection = require('mongoose').connection;

before(() => {
  let studioGolden,
    studioWarner,
    studioFantastico = '';
  let actorBruce,
    actorJohn,
    actorJim,
    actorNora,
    actorNoodle,
    actorPaul = '';
  let reviewerOne,
    reviewerTwo,
    reviewerThree,
    reviewerFour = '';
  let filmDragon1,
    filmDragon2,
    filmFury,
    filmGreat = '';
  let reviewerCranky,
    reviewerSiskel,
    reviewerEbert,
    reviewerBob = '';
  let review0,
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
    review7,
    review8,
    review9,
    review10,
    review11 = '';

  before(async () => {
    connection.dropDatabase();
    studioGolden = await saveStudio(d.studioGolden);
    studioWarner = await saveStudio(d.studioWarner);
    studioFantastico = await saveStudio(d.studioFantastico);
  }),
    before(async () => {
      actorJim = await saveActor(d.actorJim);
      actorJohn = await saveActor(d.actorJohn);
      actorBruce = await saveActor(d.actorBruce);
      actorNora = await saveActor(d.actorNora);
      actorNoodle = await saveActor(d.actorNoodle);
      actorPaul = await saveActor(d.actorPaul);
    });
  before(async () => {
    reviewerCranky = await saveReviewer(d.reviewerCranky);
    reviewerSiskel = await saveReviewer(d.reviewerSiskel);
    reviewerEbert = await saveReviewer(d.reviewerEbert);
    reviewerBob = await saveReviewer(d.reviewerBob);
  });
  before(async () => {
    (filmDragon1 = {
      title: 'Way of the Dragon',
      studio: studioGolden._id,
      released: 1972,
      cast: [
        { role: 'Tang Lung', actor: actorBruce._id },
        { role: 'Chen Ching-hua', actor: actorNora._id },
        { role: 'Ho', actor: actorPaul._id }
      ]
    }),
      (filmDragon2 = {
        title: 'Enter the Dragon',
        studio: studioWarner._id,
        released: 1973,
        cast: [
          { role: 'Lee', actor: actorBruce._id },
          { role: 'Roper', actor: actorJohn._id },
          { role: 'Williams', actor: actorJim._id }
        ]
      }),
      (filmFury = {
        title: 'Fist of Fury',
        studio: studioGolden._id,
        released: 1972,
        cast: [
          { role: 'Chen Zhen', actor: actorBruce._id },
          { role: "Yuan Li'er", actor: actorNora._id }
        ]
      }),
      (filmGreat = {
        title: 'The Greatest Film Ever',
        studio: studioFantastico._id,
        released: 1997,
        cast: [
          { role: 'Mayor of Magnificence', actor: actorNoodle._id },
          { role: 'Tang Lung', actor: actorBruce._id },
          { role: 'Chen Ching-hua', actor: actorNora._id },
          { role: 'Ho', actor: actorPaul._id }
        ]
      }),
      (filmDragon1 = await saveFilm(filmDragon1));
    filmDragon2 = await saveFilm(filmDragon2);
    filmFury = await saveFilm(filmFury);
    filmGreat = await saveFilm(filmGreat);
  });
  before(async () => {
    (review0 = {
      rating: 5,
      reviewer: reviewerEbert._id,
      review: 'I love a parade!',
      film: filmDragon2._id
    }),
      (review1 = {
        rating: 2,
        reviewer: reviewerSiskel._id,
        review: 'this movie stinks',
        film: filmDragon1._id
      }),
      (review2 = {
        rating: 5,
        reviewer: reviewerBob._id,
        review: 'this movie was great!',
        film: filmFury._id
      }),
      (review3 = {
        rating: 1,
        reviewer: reviewerEbert._id,
        review: "I wouldn't let my dog chew on the DVD",
        film: filmDragon1._id
      }),
      (review4 = {
        rating: 4,
        review: "I'd let my dog chew on the DVD",
        reviewer: reviewerBob._id,
        film: filmDragon1._id
      }),
      (review5 = {
        rating: 5,
        reviewer: reviewerEbert._id,
        review: 'I love a parade!',
        film: filmDragon2._id
      }),
      (review6 = {
        rating: 5,
        reviewer: reviewerSiskel._id,
        review: 'I love a parade!',
        film: filmDragon2._id
      }),
      (review7 = {
        rating: 5,
        reviewer: reviewerCranky._id,
        review: 'I love a parade!',
        film: filmDragon2._id
      }),
      (review8 = {
        rating: 3,
        reviewer: reviewerBob._id,
        review: 'this movie was great!',
        film: filmFury._id
      }),
      (review9 = {
        rating: 2,
        reviewer: reviewerSiskel._id,
        review: 'this movie was great!',
        film: filmFury._id
      }),
      (review10 = {
        rating: 5,
        reviewer: reviewerEbert._id,
        review: 'this movie was great!',
        film: filmFury._id
      }),
      (review11 = {
        rating: 4,
        reviewer: reviewerCranky._id,
        review: 'this movie was great!',
        film: filmFury._id
      });
    review0 = await saveReview(review0);
    review1 = await saveReview(review1);
    review2 = await saveReview(review2);
    review3 = await saveReview(review3);
    review4 = await saveReview(review4);
    review5 = await saveReview(review5);
    review6 = await saveReview(review6);
    review7 = await saveReview(review7);
    review8 = await saveReview(review8);
    review9 = await saveReview(review9);
    review10 = await saveReview(review10);
    review11 = await saveReview(review11);
  });
});
