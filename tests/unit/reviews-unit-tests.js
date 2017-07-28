const assert = require('chai').assert;
const Review = require('../../lib/models/review-model');
const Reviewer = require('../../lib/models/reviewer-model');
const Film = require('../../lib/models/film-model');


const expectedValidation = () => { throw new Error('expected validation errors'); };
