const assert = require('chai').assert;
const Reviewer = require('../../lib/models/reviewer-model');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('reviewer model', () => {

    it('validates good model', () => {
        const siskel = new Reviewer({
            name: 'Siskel',
            company: 'filmflappers.net'
        });

        return siskel.validate();
    });

});