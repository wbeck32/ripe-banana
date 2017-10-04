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
    review11,
    review12,
    review13,
    review14,
    review15,
    review16,
    review17,
    review18,
    review19,
    review20,
    review21,
    review22,
    review23 = '';

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
    }),
    before(async () => {
      reviewerCranky = await saveReviewer(d.reviewerCranky);
      reviewerSiskel = await saveReviewer(d.reviewerSiskel);
      reviewerEbert = await saveReviewer(d.reviewerEbert);
      reviewerBob = await saveReviewer(d.reviewerBob);
    }),
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
        (filmDragon12 = {
          title: 'Dragon 12',
          studio: studioFantastico._id,
          released: 1972,
          cast: [
            { role: 'Tang Lung', actor: actorJim._id },
            { role: 'Chen Ching-hua', actor: actorNora._id },
            { role: 'Ho', actor: actorPaul._id }
          ]
        }),
        (filmDragon13 = {
          title: 'Enter Dragon 13',
          studio: studioWarner._id,
          released: 1973,
          cast: [
            { role: 'Lee', actor: actorBruce._id },
            { role: 'Roper', actor: actorJohn._id },
            { role: 'Williams', actor: actorJim._id }
          ]
        }),
        (filmFury2 = {
          title: 'Fist of Fury II',
          studio: studioGolden._id,
          released: 1972,
          cast: [
            { role: 'Chen Zhen', actor: actorJohn._id },
            { role: "Yuan Li'er", actor: actorNora._id }
          ]
        }),
        (filmGreat9 = {
          title: 'The Greatest Film You Have Never Seen',
          studio: studioFantastico._id,
          released: 1997,
          cast: [
            { role: 'Mayor of Magnificence', actor: actorNoodle._id },
            { role: 'Tang Lung', actor: actorBruce._id },
            { role: 'Chen Ching-hua', actor: actorNora._id }
          ]
        }),
        (filmDragon10 = {
          title: 'Way the Dragon Left',
          studio: studioGolden._id,
          released: 2012,
          cast: [
            { role: 'Tang Lung', actor: actorBruce._id },
            { role: 'Chen Ching-hua', actor: actorNora._id },
            { role: 'Ho', actor: actorPaul._id }
          ]
        }),
        (filmDragon11 = {
          title: 'Enter the Dragon Again: He Is Back',
          studio: studioWarner._id,
          released: 1983,
          cast: [
            { role: 'Lee', actor: actorBruce._id },
            { role: 'Roper', actor: actorJohn._id },
            { role: 'Williams', actor: actorNora._id }
          ]
        }),
        (filmFury12 = {
          title: 'Fist of Fury: SO MUCH VIOLENCE',
          studio: studioFantastico._id,
          released: 1992,
          cast: [
            { role: 'Chen Zhen', actor: actorBruce._id },
            { role: "Yuan Li'er", actor: actorNora._id }
          ]
        }),
        (filmGreatAgain13 = {
          title: 'The Greatest Film Ever She Said',
          studio: studioFantastico._id,
          released: 2007,
          cast: [
            { role: 'Mayor of Magnificence', actor: actorNoodle._id },
            { role: 'Tang Lung', actor: actorBruce._id },
            { role: 'Chen Ching-hua', actor: actorNora._id }
          ]
        }),
        (filmDragon1 = await saveFilm(filmDragon1));
      filmDragon2 = await saveFilm(filmDragon2);
      filmFury = await saveFilm(filmFury);
      filmGreat = await saveFilm(filmGreat);
      filmDragon12 = await saveFilm(filmDragon12);
      filmDragon13 = await saveFilm(filmDragon13);
      filmFury2 = await saveFilm(filmFury2);
      filmGreat9 = await saveFilm(filmGreat9);
      filmDragon10 = await saveFilm(filmDragon10);
      filmDragon11 = await saveFilm(filmDragon11);
      filmFury12 = await saveFilm(filmFury12);
      filmGreatAgain13 = await saveFilm(filmGreatAgain13);
    }),
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
          film: filmGreat9._id
        }),
        (review3 = {
          rating: 1,
          reviewer: reviewerEbert._id,
          review: "I wouldn't let my dog chew on the DVD",
          film: filmDragon12._id
        }),
        (review4 = {
          rating: 4,
          review: "I'd let my dog chew on the DVD",
          reviewer: reviewerBob._id,
          film: filmDragon13._id
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
          film: filmGreat._id
        }),
        (review8 = {
          rating: 4,
          reviewer: reviewerBob._id,
          review: 'this movie was great!',
          film: filmFury._id
        }),
        (review9 = {
          rating: 4,
          reviewer: reviewerSiskel._id,
          review: 'this movie was great!',
          film: filmFury12._id
        }),
        (review10 = {
          rating: 5,
          reviewer: reviewerEbert._id,
          review: 'this movie was great!',
          film: filmFury2._id
        }),
        (review11 = {
          rating: 4,
          reviewer: reviewerCranky._id,
          review: 'this movie was great!',
          film: filmFury2._id
        }),
        (review12 = {
          rating: 5,
          reviewer: reviewerEbert._id,
          review: 'This review 12!',
          film: filmDragon12._id
        }),
        (review13 = {
          rating: 3,
          reviewer: reviewerSiskel._id,
          review: 'This review 13!',
          film: filmDragon10._id
        }),
        (review14 = {
          rating: 1,
          reviewer: reviewerBob._id,
          review: 'This review 14!',
          film: filmFury2._id
        }),
        (review15 = {
          rating: 2,
          reviewer: reviewerEbert._id,
          review: "I wouldn't let my dog chew on the DVD again",
          film: filmDragon12._id
        }),
        (review16 = {
          rating: 3,
          review: 'This is review 16!',
          reviewer: reviewerBob._id,
          film: filmDragon13._id
        }),
        (review17 = {
          rating: 5,
          reviewer: reviewerEbert._id,
          review: 'This is review 17!',
          film: filmDragon12._id
        }),
        (review18 = {
          rating: 4,
          reviewer: reviewerSiskel._id,
          review: 'Last night I dreamt of rain.',
          film: filmDragon11._id
        }),
        (review19 = {
          rating: 2,
          reviewer: reviewerCranky._id,
          review: 'I heard there would be vampires.',
          film: filmDragon2._id
        }),
        (review20 = {
          rating: 1,
          reviewer: reviewerBob._id,
          review: 'this movie was great?',
          film: filmGreatAgain13._id
        }),
        (review21 = {
          rating: 2,
          reviewer: reviewerSiskel._id,
          review: 'Your mom said this movie was great!',
          film: filmFury2._id
        }),
        (review22 = {
          rating: 4,
          reviewer: reviewerEbert._id,
          review: 'I have never loved a schema more',
          film: filmFury2._id
        }),
        (review23 = {
          rating: 1,
          reviewer: reviewerCranky._id,
          review: 'My cat peed on the DVD.',
          film: filmGreatAgain13._id
        }),
        (review0 = await saveReview(review0));
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
      review12 = await saveReview(review12);
      review13 = await saveReview(review13);
      review14 = await saveReview(review14);
      review15 = await saveReview(review15);
      review16 = await saveReview(review16);
      review17 = await saveReview(review17);
      review18 = await saveReview(review18);
      review19 = await saveReview(review19);
      review20 = await saveReview(review20);
      review21 = await saveReview(review21);
      review22 = await saveReview(review22);
      review23 = await saveReview(review23);
    });
});
