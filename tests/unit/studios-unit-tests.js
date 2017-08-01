const assert = require('chai').assert;
const Studio = require('../../lib/models/studio-model');

const expectedValidation = () => { throw new Error('expected validation errors') ;};

describe('studio model', () => {

    it('validates good model', () => {
        const fox = new Studio({
            name: '20th Century Foxes',
            address: {
                city: 'Burbank',
                state: 'CA',
                country: 'USA'
            }
        });
        return fox.validate();
    });

    it('throws an error on a bad model', () => {
        const focus = new Studio();

        return focus.validate()
            .then(
                () => expectedValidation,
                ({ errors }) => {
                    assert.ok(errors.name);
                }
            );
    });
});