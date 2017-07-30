const Film = require("../../lib/models/film-model");
const Studio = require("../../lib/models/studio-model");
const Actor = require("../../lib/models/actor-model");
const Reviewer = require("../../lib/models/reviewer-model");
const Review = require("../../lib/models/review-model");

function createNewObjects() {
        testStudio= new Studio();
        testActor= new Actor();
        testReviewer = new Reviewer();
        testFilm = new Film();
        testReviewA = new Review();
                testReviewB = new Review();

    }
    createNewObjects();

module.exports = {


    testStudio: ({
        name: "Studio Fantastico",
        address: {
            city: "Krakow",
            state: "",
            country: "Poland"
        }
    }),

    testActor: ({
        name: "Noodly McNoodleface",
        dob: new Date("1987", "11", "11"),
        pob: "Exeter, New Hampshire"
    }),

    testFilm: new Film({
        title: "The Greatest Film Ever",
        studio: testStudio._id,
        released: 1997,
        cast: {
            role: "Mayor of Mystery",
            actor: testActor._id
        }
    }),

    testReviewer: new Reviewer({
        name: "Mr. Crankypants",
        company: "New York Times"
    }),

    testReviewA:{
        rating: 5,
        reviewer: testReviewer._id,
        review: "This may be the best film I have ever seen in my life.",
        film: testFilm._id
    },

    testReviewB: {
        rating: 0,
        reviewer: testReviewer._id,
        review: "I laughed, I cried, it became a part of me.",
        film: testFilm._id
    },

    testFilms: [{
            title: "The Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        },
        {
            title: "The Second Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        },
        {
            title: "The Third Greatest Film Ever",
            studio: testStudio._id,
            released: 1997,
            cast: {
                role: "Mayor of Mystery",
                actor: testActor._id
            }
        }
    ],

    testReviews: [{
            review: testReviewA._id

        },
        {
            review: testReviewB._id
        }
    ]
}