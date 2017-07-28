const assert = require('chai').assert;
const Reviewer = require('../../lib/models/reviewer-model');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe.only('reviewer model', () => {

    it('validates good model', () => {
        const siskel = new Reviewer({
            name: 'Siskel',
            company: 'filmflappers.net'
        });

        return siskel.validate();
    });

    it('throws an error on bad model', () =>{
        const ebert = new Reviewer();

        return ebert.validate()
            .then(
                () => expectedValidation,
                ({ errors })=> {
                    assert.ok(errors.company);
                    assert.ok(errors.name);
                }
            );
    });

});